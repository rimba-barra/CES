Ext.define('Erems.view.progressunit.GridTarget', {
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ProgressunitTargetGridStore',
        idProperty: 'spkdetail_target_id',
        extraParams: {
            mode_read: 'target',
            unit_id: 0,
            spk_id: 0
        }
    },
    alias: 'widget.progressgridtarget',
    bindPrefixName: 'Progressunit',
    initComponent: function() {
        var me = this;
      /*  if(apps.gid == 1081){
            var rowEditing = '';
        }else{
           var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });  
        }

        */


         var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });  


        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: me.generateDockedItems(),
            plugins: rowEditing,
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'plafon_plafon',
                    text: 'Description'
                },
              
                {
                    xtype: 'datecolumn',
                    header: 'Target Date',
                    id: 'target_id',
                    dataIndex: 'target_date',
                    format: 'd/m/Y',
                    width: 135,
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        format: 'd/m/Y',
                       // minValue: '01/01/2006',
                      //  minText: 'Cannot have a start date before the company existed!',
                       // maxValue: Ext.Date.format(new Date(), 'm/d/Y')
                    }
                },
               // me.generateActionColumn(),
            ]
        });

        me.callParent(arguments);
    },
    showAddNewButton: function() {
        var x = {
            xtype: 'button',
            itemId: 'btnAddNew',
            margin: '0 5 0 0',
            action: 'addNewDetail',
            iconCls: 'icon-new',
            text: 'Add New Detail'
        };
        return x;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 75,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    // defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    text: 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
            ]
        };
        return ac;
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                align: 'left',
                items: [
                    {
                        xtype: 'button',
                        action: 'generate',
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-add',
                        text: 'Generate Target Konstruksi'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});