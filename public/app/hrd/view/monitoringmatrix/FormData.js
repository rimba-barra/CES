Ext.define('Hrd.view.monitoringmatrix.FormData', {
    alias: 'widget.monitoringmatrixformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.monitoringmatrix.GridDetail'],
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
                    name: 'accesslevel_id',
                },
				{
                    xtype: 'hiddenfield',
                    name: 'index_no',
                },
				{
                    xtype: 'textfield',
                    name: 'accesslevel',
                    fieldLabel: 'Access Level Name',
					labelWidth:120,
                    width: 300,
                    readOnly: true,
                    allowBlank: false,
                },
                {
                    xtype: 'monitoringmatrixgriddetail',
                    height: 400,
                    style: 'padding: 10 0 10 0'
                }
			],
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