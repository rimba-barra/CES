Ext.define('Hrd.view.codeofconduct.Formproject', {
    alias: 'widget.codeofconductformproject',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.codeofconduct.Gridproject'],
    uniquename: "_codeofconductformproject",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'codeofconduct_id',
                    id: 'codeofconduct_id',
                    name: 'codeofconduct_id',
                    fieldLabel: 'ID',
                    hidden:true
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'file_name',
                    id: 'file_name',
                    name: 'file_name',
                    fieldLabel: 'File Name',
                    readOnly:true,
                    width: 200
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'description',
                    id: 'description',
                    name: 'description',
                    fieldLabel: 'Description',
                    readOnly:true,
                    width: 200
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'project',
                    id: 'project',
                    name: 'project',
                    fieldLabel: 'Project',
                    readOnly:true,
                    width: 200
                },
                {
                    xtype: 'codeofconductgridproject',
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
                        action: 'copy',
                        itemId: 'btnCopy',
                        padding: 5,
                        width: 180,
                        iconCls: 'icon-save',
                        text: 'Copy to selected project'
                    },
                    {
                        xtype:'tbfill'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
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