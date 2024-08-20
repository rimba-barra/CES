Ext.define('Hrd.view.scoringbsc.FormData', {
    alias: 'widget.scoringbscformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.scoringbsc.GridDetail'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
				{
                    xtype: 'hiddenfield',
                    name: 'scoringbsc_id',
                },
                {
                    xtype: 'textfield',
                    name: 'year',
                    fieldLabel: 'Year',
                    readOnly: false,
                    allowBlank: false,
                },
				{
                    xtype: 'scoringbscgriddetail',
                    height: 300,
                    style: 'padding: 10 0 10 0'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});