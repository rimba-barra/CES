Ext.define('Hrd.view.approvalmatrix.GridDetail', {
    extend          : 'Hrd.library.box.view.Grid',
    alias           : 'widget.approvalmatrixgriddetail',
    storeConfig     : {
        id              : 'ApprovalmatrixGridDetailStore',
        idProperty      : 'approvalmatrix_id',
        extraParams     : {
            mode_read   : 'listdetail'
        }
    },
    bindPrefixName  : 'Approvalmatrix',
    newButtonLabel  : 'Add',
    
    initComponent   : function() {
        var me = this;

        /*var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });*/

        Ext.applyIf(me, {
            contextMenu     : me.generateContextMenu(),
            //plugins         : [cellEditing],
            defaults        : {
                xtype       : 'gridcolumn'
            },
            viewConfig      : {},
            //selModel        : Ext.create('Ext.selection.CheckboxModel', {}),
            columns         : [{
            //     xtype       : 'rownumberer'
            // }, {
                dataIndex   : 'penilai_name',
                text        : 'Penilai',
                width       : 150,
                name        : 'penilai_name',
                //sortable    : true
            }, {
                dataIndex   : 'project_name',
                text        : 'Project Name',
                width       : 100
            }, {
                dataIndex   : 'pt_name',
                text        : 'PT Name',
                width       : 150
            }, {
                dataIndex   : 'department',
                text        : 'Dept',
                width       : 50
            }, {
                dataIndex   : 'approvallevel',
                text        : 'Level',
                width       : 150
            }, {
                dataIndex   : 'doc_dept',
                text        : 'Doc Approval',
                width       : 100
            }, {
				xtype: 'booleancolumn',
				text: 'Approval',
				dataIndex: 'is_plan_approval',
				trueText: '&#10003;',
				falseText: ' ',                    
				resizable: false,
				width: 55,
				align: 'center'
			}, {
				xtype: 'booleancolumn',
				text: 'Mid Year',
				dataIndex: 'is_midyear_evaluation',
				trueText: '&#10003;',
				falseText: ' ',                    
				resizable: false,
				width: 55,
				align: 'center'
			}, {
				xtype: 'booleancolumn',
				text: 'End Year',
				dataIndex: 'is_endyear_evaluation',
				trueText: '&#10003;',
				falseText: ' ',                    
				resizable: false,
				width: 55,
				align: 'center'
			},
                me.generateActionColumn()
            ],
			bbar: [
            '',
            {
                xtype: 'tbfill'
            },
            '',
            {
                xtype: 'tbfill'
            },
			{
                xtype: 'button',
                hidden: false,
                itemId: 'btnAddDetail',
                margin: '0 5 0 0',
                action: 'addDetail',
                iconCls: 'icon-new',
                text: 'Add New',
			}
            ]
        });

        me.callParent(arguments);
    },

    generateActionColumn : function() {
        var me = this;
        var ac = {
            xtype       : 'actioncolumn',
            width       : 60,
            hidden      : false,
            resizable   : false,
            align       : 'center',
            items       : [{
                defaultIcon : 'icon-search',
                action      : 'edit',
                iconCls     : 'ux-actioncolumn icon-edit act-edit',
                altText     : 'Edit',
                tooltip     : 'Edit'
            }, {
                defaultIcon : 'icon-delete',
                action      : 'destroy',
                iconCls     : 'ux-actioncolumn icon-delete act-destroy',
                altText     : 'Delete',
                tooltip     : 'Delete'
            }]
        };

        return ac;
    }
});