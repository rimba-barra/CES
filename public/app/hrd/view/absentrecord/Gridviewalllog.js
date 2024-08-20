Ext.define('Hrd.view.absentrecord.Gridviewalllog', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridviewalllog',
    storeConfig: {
        id: 'absentrecordGridviewalllog',
        idProperty: 'fingerprintprocess_id',
        extraParams: {}
    },
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                 {
                    xtype: 'rownumberer',
                    text: 'No',
                    width: 40,
                    align: 'right',
                },
                {
                    dataIndex: 'psnno',
                    text: 'PSN No',
                    width: 120,
                    name: 'psnno',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'psnname',
                    text: 'PSN Name',
                    align: 'left',
                    width: 180,
                    name: 'psnname',
                    sortable: true
                },
                {
                    dataIndex: 'date',
                    text: 'Date',
                    width: 100,
                    name: 'date',
                    align: 'center',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'time',
                    text: 'Time',
                    width: 90,
                    name: 'time',
                    sortable: true
                },
                {
                    dataIndex: 'is_fingerprint',
                    text: 'is Finger Print',
                    width: 90,
                    name: 'is_fingerprint',
                    sortable: true,
                    renderer: function(value){
                        if(parseInt(value) == 1){
                            return '&#10003;';
                        } else {
                            return ''
                        }
                    }
                },
                {
                    dataIndex: 'tipe',
                    text: 'Tipe',
                    width: 100,
                    name: 'tipe',
                    sortable: true
                },
            ]
        });

        me.callParent(arguments);
    },
    
});