Ext.define('Hrd.view.monitoringmatrix.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.monitoringmatrixgriddetail',
    storeConfig: {
        id: 'MonitoringmatrixGridDetailStore',
        idProperty: 'accessmatrix_id',
        extraParams: {
            mode_read: 'monitoringmatrixdetaillist'
        }
    },
    bindPrefixName: 'Monitoringmatrix',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
		
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });
		
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            //contextMenu: me.generateContextMenu(),
            plugins			: [cellEditing],
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig      : {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
				{
					dataIndex   : 'employee_nik',
					text        : 'NIK',
					width       : 90,
					name        : 'employee_nik',
				}, {
					dataIndex   : 'employee_name',
					text        : 'Employee Name',
					width       : 200
				}, {
					xtype		: 'booleancolumn',
					text		: 'Status',
					dataIndex	: 'status',
					//trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 55,
					align		: 'center',
					renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
						metaData.tdAttr = 'style="background-color: #FFC;"';						
						return value == 1 ? '&#10003;' : '';
					},
					editor      : {
						xtype	: 'checkbox',
						name	: 'status'
					}
				}, {
					xtype		: 'booleancolumn',
					text		: 'Content',
					dataIndex	: 'content',
					//trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 50,
					align		: 'center',
					renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
						metaData.tdAttr = 'style="background-color: #FFC;"';						
						return value == 1 ? '&#10003;' : '';
					},
					editor      : {
						xtype	: 'checkbox',
						name	: 'content'
					}
				}, {
					xtype		: 'booleancolumn',
					text		: 'Score',
					dataIndex	: 'score',
					//trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 50,
					align		: 'center',
					renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
						metaData.tdAttr = 'style="background-color: #FFC;"';						
						return value == 1 ? '&#10003;' : '';
					},
					editor      : {
						xtype	: 'checkbox',
						name	: 'score'
					}
				}, {
					xtype		: 'booleancolumn',
					text		: 'Comment', 
					dataIndex	: 'comment_general',
					tooltip		: 'comment khusus Employee-DS-IS-HR',
					//trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 70,
					align		: 'center',
					renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
						metaData.tdAttr = 'style="background-color: #FFC;"';
						return value == 1 ? '&#10003;' : '';
					},
					editor      : {
						xtype	: 'checkbox',
						name	: 'comment_general'
					}
				}, {
					xtype		: 'booleancolumn',
					text		: 'Private Comment', 
					dataIndex	: 'comment_private',
					tooltip		: 'comment untuk DS-IS-HR-SD',
					//trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 110,
					align		: 'center',
					renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
						metaData.tdAttr = 'style="background-color: #FFC;"';						
						return value == 1 ? '&#10003;' : '';
					},
					editor      : {
						xtype	: 'checkbox',
						name	: 'comment_private'
					}
				}, {
					xtype		: 'booleancolumn',
					text		: 'Approve',
					dataIndex	: 'is_approve',
					trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 55,
					align		: 'center'
				}, {
					dataIndex   : 'approveon',
					text        : 'Approve Date',
					width       : 85,
				   	renderer: Ext.util.Format.dateRenderer('d-M-Y')
				}, {
					dataIndex   : 'approveby_name',
					text        : 'Approve By',
					width       : 80
				}, {
					xtype		: 'booleancolumn',
					text		: 'Reject',
					dataIndex	: 'is_reject',
					trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 50,
					align		: 'center'
				}, {
					dataIndex   : 'rejecton',
					text        : 'Reject Date',
					width       : 80,
				   	renderer: Ext.util.Format.dateRenderer('d-M-Y')
				},{
					dataIndex   : 'rejectby_name',
					text        : 'Reject By',
					width       : 80
				}, {
					xtype		: 'booleancolumn',
					text		: 'Submit',
					dataIndex	: 'is_submitforapproval',
					trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 50,
					align		: 'center'
				}, 
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add',
                        itemId: 'btnAddDetail',
                        action: 'addDetail',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Copy from other level',
                        itemId: 'btnCopy',
                        action: 'copy',
                        iconCls: 'icon-copy'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDeleteDetail',
                        action: 'deleteDetail',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                    {
						xtype:'splitbutton',
                        text: 'Check / Uncheck Selected',
                        itemId: 'checkuncheckall',
                        iconCls: 'icon-edit',
						disabled:true,
						menu:[
						{
							text: 'Check Selected Status',
							itemId: 'btnStatusCheck',
                        	bindAction: me.bindPrefixName + 'CheckStatus'
						},
						{
							text: 'Check Selected Content',
							itemId: 'btnContentCheck',
                        	bindAction: me.bindPrefixName + 'CheckContent'
						},
						{
							text: 'Check Selected Score',
							itemId: 'btnScoreCheck',
                        	bindAction: me.bindPrefixName + 'CheckScore'
						},
						{
							text: 'Check Selected Comment General',
							itemId: 'btnCommentGeneralCheck',
                        	bindAction: me.bindPrefixName + 'CheckCommentGeneral'
						},
						{
							text: 'Check Selected Comment Private',
							itemId: 'btnCommentPrivateCheck',
                        	bindAction: me.bindPrefixName + 'CheckCommentPrivate'
						},'-',
						{
							text: 'Uncheck Selected Status',
							itemId: 'btnStatusUncheck',
                        	bindAction: me.bindPrefixName + 'UncheckStatus'
						},
						{
							text: 'Uncheck Selected Content',
							itemId: 'btnContentUncheck',
                        	bindAction: me.bindPrefixName + 'UncheckContent'
						},
						{
							text: 'Uncheck Selected Score',
							itemId: 'btnScoreUncheck',
                        	bindAction: me.bindPrefixName + 'UncheckScore'
						},
						{
							text: 'Uncheck Selected Comment General',
							itemId: 'btnCommentGeneralUncheck',
                        	bindAction: me.bindPrefixName + 'UncheckCommentGeneral'
						},
						{
							text: 'Uncheck Selected Comment Private',
							itemId: 'btnCommentPrivateUncheck',
                        	bindAction: me.bindPrefixName + 'UncheckCommentPrivate'
						}]
                    },
                    {
                        text: 'Approve Selected',
                        itemId: 'btnApproveDetail',
                        action: 'approveDetail',
                        iconCls: 'icon-approve',
                        hidden: true,
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Approve'
                    },
                    {
                        text: 'Reject Selected',
                        itemId: 'btnRejectDetail',
                        action: 'rejectDetail',
                        iconCls: 'icon-unapprove',
                        hidden: true,
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Reject'
                    },
					{
						xtype:'tbfill'
					},
                    {
                        text: 'Submit for Approval',
                        itemId: 'btnSubmitforapp',
                        action: 'submitforapp',
                        //iconCls: 'icon-reject',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Submitforapp'
                    }
                ]
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
			]
        };

        return ac;
    }
});