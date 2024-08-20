Ext.define('Erems.controller.Mastergirik', {
    extend: 'Main.library.Controller',
    
	alias: 'controller.Mastergirik',
	
	models: [
        'Mastergirik', 'Mastergirikdetail'
    ],
    stores: [
        'Mastergirik', 'Mastergirikdetail'
    ],
    views: [
        'mastergirik.Panel',
		'mastergirik.FormSearch',
		'mastergirik.Grid',
		'mastergirik.FormData',
		'mastergirik.MastergirikDetailGrid',
		'mastergirik.DetailFormData'
    ],
	refs: [	
		{
			ref: 'detailgrid',
			selector: 'MastergirikDetailGrid'
		}
	],
	
	init: function() {
		var me = this;
		
		me.control('#'+me.selfName+'DetailFormData', {
			afterrender: me.formDataDetailAfterRender
		});
		
		me.callParent(arguments);
	},
    gridPanelAfterRender: function(el) {
        var me = this;
    
        me.dataReset();

        var form = me.getMainFormSearch();
        me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);
        
        for (var i=0;i<me.textfield.length;i++) {
            Ext.applyIf(me.textfield[i], {enableKeyEvents: true});
            
            me.textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.dataSearch();
                }
            });
        }
    },
	
	formDataDetailAfterRender: function(el) {
		var me = this;
		
		var state = el.up('window').iconCls;
		
		if (state == 'icon-form-edit') {
			var grid = me.getDetailgrid();
			var store = grid.getStore();
			
			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);
		}
	}
	
});