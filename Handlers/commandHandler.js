async function loadCommands(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Commands", "Status");

    // Clear all old commands
    await client.commands.clear();
    await client.application.commands.set([]);

    let commandsArray = [];

    const Files = await loadFiles("Commands");

    Files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "✅");
    });

    // Set the new commands
    client.application.commands.set(commandsArray);

    return console.log(table.toString(), "\nCommands Loaded.");

}

module.exports = { loadCommands };