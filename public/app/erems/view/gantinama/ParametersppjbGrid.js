Ext.define('Erems.view.gantinama.ParametersppjbGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.gantinamaparametersppjbgrid',
    storeConfig: {
        id: 'CNUnitGridStore',
        idProperty: 'parametersppjb_id',
        extraParams: {
            mode_read: 'parametersppjb'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Gantinama',
    newButtonLabel: 'New Purchaseletter',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'parametersppjb_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 50,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name_01',
                    width: 100,
                    dataIndex: 'name_01',
                    hideable: false,
                    text: 'Nama 1'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_position_01',
                    width: 150,
                    dataIndex: 'position_01',
                    hideable: false,
                    text: 'Jabatan 1'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_name_02',
                    width: 100,
                    dataIndex: 'name_02',
                    hideable: false,
                    text: 'Nama 2'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_position_02',
                    width: 150,
                    dataIndex: 'position_02',
                    hideable: false,
                    text: 'Jabatan 2'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akta_no',
                    width: 50,
                    align: 'right',
                    dataIndex: 'akta_no',
					hideable: false,
                    text: 'Akta No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akta_date',
                    width: 150,
                    dataIndex: 'akta_date',
					hideable: false,
                    text: 'Akta Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Select Parameter"
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function() {

        var cbf = new Erems.template.ComboBoxFields();

        var x = [
           
           
        ];
        return x;
    }
});