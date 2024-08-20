Ext.define('Hrd.view.msection.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.msectiongrid',
    store: 'Sectiondepartment',
    bindPrefixName: 'MSection',
    itemId: 'MSection',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
		/*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 160,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department'
                },
		*/
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 120,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_section',
                    width: 200,
                    dataIndex: 'section',
                    hideable: false,
                    text: 'Section'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 250,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                me.generateActionColumn(),
               
            ],
        });

        me.callParent(arguments);
    },
    
    
});


