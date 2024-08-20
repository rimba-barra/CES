Ext.define('Gl.view.coa.FormImport', {
    extend: 'Gl.library.template.view.FormImport',
    alias: 'widget.coaformimport',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'projectcombobox', //dari alias yang di riquires Gl.library.template.combobox.Subaccountgroupcombobox
                    fieldLabel: 'Project',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'project_id', 
                    itemId: 'fsms_project_id', 
                    id: 'fsms_project_id',
                    flex: 1
                },
                
                {
                    xtype: 'ptcombobox', 
                    fieldLabel: 'PT',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'pt_id', 
                    itemId: 'fsms_pt_id', 
                    id: 'fsms_pt_id',
                    flex: 1
                },
                /*
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Level',
                    labelWidth: 100,
                    layout: 'hbox',
                    defaults: {
                        flex: 1
                    },
                     items: [
                                
                                {
                                        xtype: 'textfield',
                                        name :'fromlevel',
                                        value :'1',
                                        width :10,
                                        disable :true
                                }, 
                                {
                                        xtype: 'label',
                                        text: 'To',
                                        margin: '0 0 0 30'
                                }, 
                                {
                                    xtype: 'textfield',
                                    name :'untillevel',
                                    emptyText :'Until Level',
                                    width :10,
                                    margin: '0 40 0 0'
                                    
                                }
                        ]
                }
               */ 
            ],
            dockedItems: me.generateDockedItemImport()
        });

        me.callParent(arguments);
    }
});
