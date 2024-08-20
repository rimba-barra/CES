Ext.define('Erems.controller.Masterfakturpajakcounter', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Masterfakturpajakcounter',
    views: ['masterfakturpajakcounter.Panel', 'masterfakturpajakcounter.Grid', 'masterfakturpajakcounter.FormSearch', 'masterfakturpajakcounter.FormData'],
    stores: ['Masterfakturpajakcounter'],
    models: ['Masterfakturpajakcounter'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterfakturpajakcountergrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterfakturpajakcounterformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterfakturpajakcounterformdata'
        },
    ],
    controllerName: 'masterfakturpajakcounter',
    fieldName: 'bank_name',
    bindPrefixName:'Masterfakturpajakcounter',
	ftStore2: null,
    init: function(application) {
        var me = this;
        this.control({
            'masterfakturpajakcounterpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'masterfakturpajakcountergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
				edit: this.editCounter
            },
            'masterfakturpajakcountergrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterfakturpajakcountergrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterfakturpajakcountergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterfakturpajakcountergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterfakturpajakcountergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
			'masterfakturpajakcounterformsearch': {
				afterrender: this.formSearchAfterRender
			},
            'masterfakturpajakcounterformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterfakturpajakcounterformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterfakturpajakcounterformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterfakturpajakcounterformdata button[action=save]': {
                click: this.dataSave
            },
            'masterfakturpajakcounterformdata button[action=cancel]': {
                click: this.formDataClose
            }
        });
    },
	
	editCounter : function(editor, obj) {
    	//check if record is dirty 
        if(obj.record.dirty){
        	//check if the record is valid   
            if(obj.record.validate().isValid()){
            	//Make your Ajax request to sync data
                mode = (obj.record.get('fakturpajak_counter_id') === "") ? 'insert': 'update';
                this.syncData(obj.rowIdx, mode);
           	}
     	}
	},
	
	//Sync data with the server 
	syncData : function(rowIndex, mode) {
		Ext.Ajax.request({
			//url: 'CustomerServlet',
			url:'erems/masterfakturpajakcounter/update',
			params: {
				//store_id: 1,
				action: mode,
				rowIndex: rowIndex,
				data: Ext.encode(this.getMasterfakturpajakcounterStore().getAt(rowIndex).data)
			},
			scope:this,
			//method to call when the request is successful
			success: this.onSaveSuccess,
			//method to call when the request is a failure
			failure: this.onSaveFailure
		});
	},
	
	onSaveFailure: function(err){
		//Alert the user about communication error
		Ext.MessageBox.alert('Status', 'Update Last Counter Gagal');
	},

	onSaveSuccess: function(response,opts){
		//Remove dirty
		var ajaxResponse = Ext.decode(response.responseText);
		if(ajaxResponse.success){
			//if we are doing an insert then get the new customerId 
			//and update the store record
			/*if(opts.params.action === 'insert'){
				customerId = ajaxResponse.customerId;
				this.getCustomersStore().getAt(opts.params.rowIndex).set('customerId',customerId);
			}*/
			this.getMasterfakturpajakcounterStore().getAt(opts.params.rowIndex).commit();
		}
		else {
			Ext.MessageBox.alert('Status', 'Update Last Counter Gagal');
		}
	}
});