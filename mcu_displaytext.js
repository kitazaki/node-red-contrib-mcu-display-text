module.exports = function(RED) {
    function DisplayText(config) {
        RED.nodes.createNode(this,config);
        console.log(config);
    }
    RED.nodes.registerType("mcu_displaytext",DisplayText);
}
