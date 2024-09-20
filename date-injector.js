const dayjs = require('dayjs'); // Main Day.js package
const updateLocale = require('dayjs/plugin/updateLocale'); // Plugin to update locale settings
const localizedFormat = require('dayjs/plugin/localizedFormat'); // Plugin for localized date formats
const advancedFormat = require('dayjs/plugin/advancedFormat'); // Plugin for advanced date formats

// Extend Day.js with necessary plugins
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);

// Load supported locales dynamically based on the languages you want to support
const supportedLocales = {
    en: require('dayjs/locale/en'), // English locale
    fr: require('dayjs/locale/fr'), // French locale
    es: require('dayjs/locale/es'), // Spanish locale
    // Add more locales here if needed
};

module.exports = function (RED) {
    function DateInjectorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Main function that gets triggered on node input
        node.on('input', function (msg) {

            // Get user-selected language or default to English
            const userLang = config.language || 'en'; 
            const msgFields = config.msgFields || []; // Get the message fields from the config

            // Set the locale for Day.js based on the selected language
            dayjs.locale(supportedLocales[userLang]);

            let anomalies = []; // Array to store any detected anomalies

            // Iterate over all message fields
            msgFields.forEach(function (field, index) {
                const msgName = field.msgName || `msg${index + 1}`; // Default message name if not provided
                const operation = field.operation || ""; // Add or subtract operation
                const formatInput = field.format || ""; // Date format to be applied
                const amount = field.amount || ""; // Time adjustment amount (e.g., 10S, 2H)

                // Validate if both msgName and format are provided
                if (!msgName || !formatInput) {
                    anomalies.push({
                        msgField: msgName || `Msg field ${index + 1}`,
                        issue: "Missing date format or message name"
                    });
                    return; // Skip to the next iteration if validation fails
                }

                // Step 1: Get the current date/time based on the selected locale
                let currentTime = dayjs(); // Use Day.js to get the current local time

                // Step 2: Apply any operation (add/subtract) based on user input
                if (operation && amount) {
                    const value = parseFloat(amount.slice(0, -1)); // Extract the numeric value from the amount
                    const unit = amount.slice(-1); // Extract the unit (e.g., S, M, H)

                    // Switch case to handle the supported time units
                    switch (unit) {
                        case "s": // Seconds
                            currentTime = operation === "+" ? currentTime.add(value, 'second') : currentTime.subtract(value, 'second');
                            break;
                        case "m": // Minutes
                            currentTime = operation === "+" ? currentTime.add(value, 'minute') : currentTime.subtract(value, 'minute');
                            break;
                        case "h": // Hours
                            currentTime = operation === "+" ? currentTime.add(value, 'hour') : currentTime.subtract(value, 'hour');
                            break;
                        case "D": // Days
                            currentTime = operation === "+" ? currentTime.add(value, 'day') : currentTime.subtract(value, 'day');
                            break;
                        case "W": // Weeks
                            currentTime = operation === "+" ? currentTime.add(value, 'week') : currentTime.subtract(value, 'week');
                            break;
                        case "M": // Months
                            currentTime = operation === "+" ? currentTime.add(value, 'month') : currentTime.subtract(value, 'month');
                            break;
                        case "Y": // Years
                            currentTime = operation === "+" ? currentTime.add(value, 'year') : currentTime.subtract(value, 'year');
                            break;
                        default: // Handle unsupported units
                            anomalies.push({
                                msgField: msgName,
                                issue: "Invalid time unit (only Y, M, W, D, h, m, s allowed)"
                            });
                            return; // Skip this iteration if the unit is invalid
                    }
                }

                // Step 3: Format the date using the format provided by the user
                try {
                    const formattedDate = currentTime.format(formatInput); // Format the current time with the provided format

                    // Insert the formatted date into the msg object under the specified msgName
                    msg[msgName] = formattedDate;
                } catch (error) {
                    // If there's an error in formatting, add it to the anomalies list
                    anomalies.push({
                        msgField: msgName,
                        issue: `Error in date format: ${error.message}`
                    });
                }
            });

            // If any anomalies were detected, report them and add to the msg object
            if (anomalies.length > 0) {
                node.error(`Anomalies detected: ${JSON.stringify(anomalies)}`);
                msg.anomalies = anomalies;
            }

            // Send the final message with all formatted date fields
            node.send(msg);
        });
    }

    // Register the custom node with Node-RED and define its properties
    RED.nodes.registerType("date-injector", DateInjectorNode, {
        category: "function", // Place the node under the "Function" section in Node-RED
        color: "#e58139",     // Set the node color to orange
        icon: "fa-clock-o",   // Use the Font Awesome clock icon
        defaults: {
            name: { value: "" },          // Node name field
            language: { value: "en" },    // Default language (English)
            msgFields: { value: [] }      // Message fields array
        },
        inputs: 1, // Number of inputs (1 input)
        outputs: 1, // Number of outputs (1 output)
        label: function () {
            return this.name || "date-injector"; // Label for the node in the editor
        }
    });
};
