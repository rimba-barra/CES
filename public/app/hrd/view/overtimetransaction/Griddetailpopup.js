Ext.define('Hrd.view.overtimetransaction.Griddetailpopup', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.overtimetransactionGriddetailpopup',
    storeConfig: {
        id: 'overtimetransactionGriddetailpopup',
        idProperty: 'lembur_id',
        extraParams: {
            mode_read: 'getdataovertimeintranetgetdetail'
        }
    },
    bindPrefixName: 'Overtimetransaction',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            //dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            //selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'lembur_id',
                    text: 'Overtime ID',
                    width: 80,
                    name: 'lembur_id',
                    sortable: true
                },
                {
                    dataIndex: 'lembur_dari',
                    text: 'Start Time',
                    width: 120,
                    name: 'lembur_dari',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    dataIndex: 'lembur_sampai',
                    text: 'End Time',
                    width: 120,
                    name: 'lembur_sampai',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    dataIndex: 'jam_lembur_approve',
                    text: 'Approved Hour',
                    width: 100,
                    name: 'jam_lembur_approve',
                    sortable: true
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width: 345,
                    name: 'description',
                    sortable: true
                }/*,
                {
                    dataIndex: 'lemburtype',
                    text: 'Overtime Type',
                    width: 90,
                    name: 'lemburtype',
                    sortable: true
                },
                {
                    dataIndex: 'approve_by',
                    text: 'Disetujui Oleh',
                    width: 180,
                    name: 'approve_by',
                    sortable: true
                }*/
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    }
});