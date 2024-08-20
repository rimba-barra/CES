Ext.define('Erems.controller.Masterpenerimakomisi', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Masterpenerimakomisi',
    views: ['masterpenerimakomisi.Panel', 'masterpenerimakomisi.Grid', 'masterpenerimakomisi.FormSearch', 'masterpenerimakomisi.FormData'],
    stores: ['Masterpenerimakomisi','Masterparameterglobal'],
    models: ['Masterpenerimakomisi','Masterparameterglobal'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterpenerimakomisigrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterpenerimakomisiformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterpenerimakomisiformdata'
        }
    ],
    controllerName: 'masterpenerimakomisi',
    fieldName: 'code',
    bindPrefixName:'Masterpenerimakomisi',
	//formWidth: 550,
	nomorValue: 1,
	enableSelectKPR:0,
	init: function(application) {
        var me = this;
        this.control({
            'masterpenerimakomisipanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'masterpenerimakomisigrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterpenerimakomisigrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterpenerimakomisigrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterpenerimakomisigrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterpenerimakomisigrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterpenerimakomisigrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
			'masterpenerimakomisiformsearch': {
				afterrender: this.formSearchAfterRender
			},
            'masterpenerimakomisiformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterpenerimakomisiformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterpenerimakomisiformdata': {
				beforerender: this.formDataBeforeRender,
                afterrender: this.formDataAfterRender
            },
            'masterpenerimakomisiformdata button[action=save]': {
                click: me.dataSave
            },
            'masterpenerimakomisiformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'masterpenerimakomisiformdata [name=pricetype_id]': {
                select: me.comboboxPriceTypeChange
            },

        });
    },
	
	formDataBeforeRender: function(el) {
		var me = this;	
		
		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'LRP_PROJECT_PRICETYPE_SETTING'}, 
			callback:function(rec){
				if(rec.length > 0){
					var global = rec[0].get('value');
					if(global === '1'){
						me.enableSelectKPR = 1;
					} else {
						me.enableSelectKPR = 0;
					}
				} else {
					me.enableSelectKPR = 0;
				}
			}
		});
    },
	
	comboboxPriceTypeChange:function(el){
		var me = this;
		var text = el.getRawValue();
		
		if(text == 'KPR' && me.enableSelectKPR == 0){
			Ext.Msg.alert('Info','Yang bisa didaftarkan hanya CASH dan INHOUSE saja.');
			el.setValue();
		}
	}
	
});