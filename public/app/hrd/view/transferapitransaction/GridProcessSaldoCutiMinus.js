Ext.define('Hrd.view.transferapitransaction.GridProcessSaldoCutiMinus', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferapitransactionprocesssaldocutiminusgrid',
    storeConfig: {
        id: 'TransferapitransactionGridProcessSaldoCutiMinusStore',
        idProperty: 'department_id',
        extraParams: {}
    },
    bindPrefixName: 'department',
    newButtonLabel: 'New',
    itemId:'TransferapitransactionGridProcessSaldoCutiMinusID',
    layout: 'fit',
    initComponent: function() {
        var me = this;

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: me.generateDockedItems(),
            plugins     : [cellEditing],
            defaults: {
                xtype: 'gridcolumn',
                width:775
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'status_transfer',
                   text: 'Status Transfer',
                   width:100
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Update HCMS',
                    dataIndex   : 'update_hcms',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                {
                   dataIndex: 'project_name',
                   text: 'Project',
                   width:100
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT',
                   width:100
                },
                {
                   dataIndex: 'nik_group',
                   text: 'NIK Group',
                   width:100
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Employee Name',
                   width:200
                },
                {
                   dataIndex: 'department',
                   text: 'Department',
                   width:70
                }, 
                {
                   dataIndex: 'sisa_cuti',
                   text: 'Sisa Cuti',
                   width:70
                },
                {
                   dataIndex: 'total_saldocuti_minus',
                   text: 'Total Saldo Cuti Minus',
                   width:100, 
                   renderer : function(value, meta) {
                      meta.style = "background-color:#ffffcc9c;";
                      return value;
                  },
                   editor: 'textfield', 
                   editable: true,
                },
                             
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         {
            //             xtype: 'button',
            //             action: 'choose_formcompetency',
            //             iconCls: 'icon-new',
            //             text: 'Choose Competency'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'delete_formcompetency',
            //             iconCls: 'icon-delete',
            //             text: 'Delete Competency'
            //         }
            //     ]
            // },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
   
});