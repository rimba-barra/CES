Ext.define('Hrd.view.mutation.Griddocument', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.mutationdocumentgrid',
    store: 'Changestatusdocument',
    bindPrefixName: 'Mutation',
    itemId: 'Griddocumentmutation',
    title: 'Document',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_typedocument',
                    width: 120,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'typedocument',
                    hideable: false,
                    text: 'Document Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_filename',
                    width: 400,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'filename',
                    hideable: false,
                    text: 'Filename'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    icon: 'app/main/images/icons/archives.png',
                    action: 'viewdata',
                    text: 'View Document',
                    tooltip: 'View Document',
                }
            ]
        }

        return ac;

    },
});


