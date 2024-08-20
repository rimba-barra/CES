Ext.define('Hrd.view.reportmatrixcompetency.Panel', {
    extend			: 'Hrd.library.box.view.Panel',
    alias			: 'widget.reportmatrixcompetencypanel',
    requires		: ['Hrd.template.ComboBoxFields'],
    itemId 			: 'ReportMatrixCompetencyPanel',
    layout 			: 'fit',
    autoScroll		: true,
    height			: '100px',
    initComponent 	: function() {
        var me 				= this;
        var cbf 			= new Hrd.template.ComboBoxFields();

		// var jobfamilyStore = new Ext.data.Store({
		// 	proxy: new Ext.data.HttpProxy({url: 'hrd/reportmatrixcompetency/read', extraParams: {table: 'jobfamily'}}),
		// 	reader: new Ext.data.JsonReader({
		// 		root: 'data',
		// 	}),
  //           fields: [{name:'jobfamily_id'},{name:'jobfamily'}]
		// });

        var jobfamilyStore = Ext.create('Ext.data.Store', {
            fields: [{name: 'jobfamily_id'}, {name: 'jobfamily'}],
            //autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'hrd/reportmatrixcompetency/read',
                method: 'POST',
                extraParams: {
                    table: 'jobfamily'
                },
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });


        Ext.applyIf(me, {
            items 	: [{
	            xtype		: 'form',
	            layout		: 'hbox',
	            bodyPadding	: 10,
	            itemId		: 'reportmatrixcompetencyFormID',
	            width 		: '100px',
	            autoScroll	: true,
	            height 		: '80px',
	            defaults 	: {
	                xtype	: 'combobox',
	                margin	: '10px 0'
	            },
                items 		: [{
                    xtype 		: 'container',
                    style		: 'border:1px solid #99BCE8;padding:10px;background-color:#D6E3F2;',
                    bodyPadding	: '10px',
                    layout 		: 'vbox',
                    defaults 	: {
						margin 	: '0 0 10px 0',
						flex 	: 1
                    },
                    items 		: [{
                        xtype       : 'container',
		                layout      : 'hbox',
		                items       : [{
		                    xtype       : 'combobox',
		                    name        : 'jobfamily_id',
		                    fieldLabel  : 'Job Family',
		                    displayField: 'jobfamily',
		                    valueField  : 'jobfamily_id',
		                    store 		: jobfamilyStore
		                }, {
		                    xtype       : 'tbspacer',
		                    width       : 30
		                }, {
                            xtype           : 'checkboxfield',
                            fieldLabel      : '',
                            name            : 'checkall',
                            checked         : true,
                            inputValue      : '1',
                            uncheckedValue  : '0',
                            margin          : '0 5px 0 0',
                            width           : 20
                         }, {
                             xtype: 'label',
                             text: 'ALL'
		                }]
					}, {
						xtype 	: 'button',
                        action	: 'print',
                        align 	: 'right',
                        padding : 5,
                        itemId	: 'btnSearch',
                        iconCls	: 'icon-save',
                        text	: 'View Report'
					}]
                }]
			}]
        });
        me.callParent(arguments);
    }
});