Ext.define('Erems.view.spk.Alert', {
    extend: 'Ext.panel.Panel',
    bodyStyle: 'background:none; padding:10px;',
    id: 'MyAlertWinId',
    items: [],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                    xtype: 'button',
                    text: 'OK',
                    listeners: {
                        click: function(el) {
                            el.up("window").destroy();
                        }
                    }
                }]
        }]
});