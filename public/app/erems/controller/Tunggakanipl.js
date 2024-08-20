Ext.define('Erems.controller.Tunggakanipl', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Tunggakanipl',
	views: ['tunggakanipl.Panel', 'tunggakanipl.Grid', 'tunggakanipl.FormSearch', 'tunggakanipl.FormData'],
	stores: ['', 'Tunggakanipl', 'Mastercluster', 'Masterblock', 'Unit'],
	models: ['Tunggakanipl'],
	refs: [
		{
			ref: 'grid',
			selector: 'tunggakaniplgrid'
		},
		{
			ref: 'formsearch',
			selector: 'tunggakaniplformsearch'
		},
		{
			ref: 'formdata',
			selector: 'tunggakaniplformdata'
		}
	],
	controllerName: 'tunggakanipl',
	fieldName: 'unit_number',
	bindPrefixName: 'Tunggakanipl',
	formWidth: 400,
    constructor: function (configs) {

        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();

        /////// LOAD ACCOUNTING OBJECT
        if (typeof accounting === 'undefined') {

            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/accounting.min.js', function () {
                /// loaded
                // Settings object that controls default parameters for library methods:
                accounting.settings = {
                    currency: {
                        symbol: "", // default currency symbol is '$'
                        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                        decimal: ".", // decimal point separator
                        thousand: ",", // thousands separator
                        precision: 2   // decimal places
                    },
                    number: {
                        precision: 0, // default precision on numbers is 0
                        thousand: ",",
                        decimal: "."
                    }
                }

                EREMS_GLOBAL_PRECISION = 2;


            }, function () {
                /// error
            });
        }
    },
	init: function (application) {
		var me = this;
		this.control({
			'tunggakaniplpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'tunggakaniplgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'tunggakaniplgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'tunggakaniplgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'tunggakaniplgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'tunggakaniplgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'tunggakaniplgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'tunggakaniplformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'tunggakaniplformsearch button[action=search]': {
				click: this.dataSearch
			},
			'tunggakaniplformsearch button[action=reset]': {
				click: this.dataReset
			},
			'tunggakaniplformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'tunggakaniplformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},

			'tunggakaniplformdata button[action=save]': {
				click: me.dataSave
			},
			'tunggakaniplformdata button[action=cancel]': {
				click: this.formDataClose
			},
		});
	},
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
       
        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {
                Ext.MessageBox.alert('Alert', vp.msg, function() {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }
                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }
        // end added 12 Nov 2013
        if (form.isValid() && vps && me.getFormdata().down('[name=tunggakan_ipl]').getValue() > 0) {
            resetTimer();
            var store = null;
            var fida = me.getFinalData(form.getValues());
            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function() {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            switch (me.getFormdata().up('window').state.toLowerCase()) {
                case 'create':
                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }

            store.on('beforesync', msg);
            store.sync({
                success: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            me.formDataClose();
                        }
                    });
                },
                failure: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }else{
            Ext.Msg.show({
                title: 'Failure',
                msg: me.checkRequired(form)+' is required.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },
    // added by rico 21062021
    checkRequired: function(form){
        var me   = this;
        var items = form.getFields().items;
        var label = [];
        for(var i=0;i<items.length;i++){
            if(!items[i].allowBlank && (items[i].activeError != '' && typeof items[i].activeError !== 'undefined') && items[i].xtype != 'hiddenfield'){
                label.push(items[i].fieldLabel);
            }
        }
        return label.join();
    },

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
	},

	fdar: function () {
		var me = this;
		var x = {
			init: function () {
				/// init here
			},
			create: function () {
				/// create here  

			},
			update: function () {
				var grid = me.getGrid();
				var store = grid.getStore();

				var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
				me.getFormdata().loadRecord(record);
				me.getFormdata().down('[name=tunggakan_ipl]').toCurrency();
				/// update here
			}
		};
		return x;
	},
});