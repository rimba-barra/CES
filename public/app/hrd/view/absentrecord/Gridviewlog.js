Ext.define('Hrd.view.absentrecord.Gridviewlog', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridviewlog',
    storeConfig: {
        id: 'absentrecordGridviewlog',
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
                    dataIndex: 'time_in',
                    text: 'Time In',
                    width: 90,
                    name: 'time_in',
                    sortable: true
                },
                {
                    dataIndex: 'time_out',
                    text: 'Time Out',
                    width: 90,
                    name: 'time_out',
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
            ]
        });

        me.callParent(arguments);
    },
    
});