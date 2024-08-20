Ext.define('Erems.controller.Gantinama', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Gantinama',
    views: ['gantinama.Panel', 'gantinama.Grid', 'gantinama.FormSearch', 'gantinama.FormData'],
    stores: ['Gantinama', 'Unit', 'Mastercustomer'],
    models: ['Gantinama','Gantinamadetail', 'Unit', 'Mastercustomer'],
    refs: [
        {
            ref: 'grid',
            selector: 'gantinamagrid'
        },
        {
            ref: 'formsearch',
            selector: 'gantinamaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'gantinamaformdata'
        }
    ],
    comboBoxIdEl: ['reasonchgname_cb'],
    controllerName: 'gantinama',
    fieldName: 'changename_id',
    bindPrefixName: 'Gantinama',
    validationItems:[{name:'purchaseletter_id',msg:'You must select purchase letter first'},
                     {name:'reasonchgname_id',msg:'Reason change name is empty'},
                     {name:'changename_note',msg:'Notes change name is empty'},
                     {name:'admistration_fee',msg:'Admistration Fee is zero',f:'number'}
                     ],
                 
                 //admistration_fee
    formWidth: 800,
    init: function(application) {
        var me = this;

        this.control({
            test: me.eventMonthField,
            'gantinamapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'gantinamagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'gantinamagrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'gantinamagrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'gantinamagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'gantinamagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'gantinamagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'gantinamaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'gantinamaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'gantinamaformdata': {
                afterrender: this.formDataAfterRender
            },
            'gantinamaformdata button[action=save]': {
                click: this.dataSave
            
            },
            'gantinamaformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'gantinamaformdata button[action=browse_unit]': {
                click: me.selectUnitGridShow
            },
            'gantinamaformdata [name=reasonchgname_id]': {
                select: function(el, val) {
                    me.seFi.cb('reasonchgname_code', el, 'code', val);
                }
            },
            'gantinamaformdata [name=reasonchgname_code]': {
                keyup: function(el) {

                    me.seFi.tf('reasonchgname_id', el, {name: 'code', tipe: 'string'}, 'reasonchgname_id');
                }
            }
            
            

        });
    },
    selectUnitGridShow: function() {
        var me = this;

        _Apps.getController('Purchaseletter').browseItem('Gantinama');

    },
    processRowFromItemSelection: function(rows, modul) {
        var me = this;
        var customerStore = me.getMastercustomerStore();
    

        /// from Purchaseletter data
        me.getFormdata().down('[name=purchaseletter_no]').setValue(rows[0].data.purchaseletter_no);
        me.getFormdata().down('[name=purchaseletter_id]').setValue(rows[0].data.purchaseletter_id);
        var customerId = 0;
        customerId = parseInt(rows[0].data.customer_id);
        me.loadUnitData(rows[0].data.unit_id);
        
        customerStore.removeAll();
        customerStore.load({params: {customer_id: customerId, mode_read: 'detail'}, callback: function(customerrec) {
                console.log(customerrec);
                me.fillMasterCustomerData(customerrec);
                me.fillMasterCustomerData(customerrec, 'customer_new');
                //  me.countLoadProcess += 1;
                // me.checkAllDetailLoadingProcess();
            }});
        /// end from Purchaseletter data

        return false;
        switch (modul) {
            case 'purchaseletter':
                me.fillMarketStockData(rows);
            case 'mastercustomer':
                me.fillMasterCustomerData(rows);
        }

    },
    loadUnitData: function(unitId, callBackFunc) {

        var me = this;
        var unitStore = me.getUnitStore();


        unitStore.load({
            params: {unit_id: unitId},
            callback: function(records) {
                me.fillUnitDataToForm(records[0]);
                if (typeof callBackFunc === 'function') {
                    callBackFunc();
                }
            }
        }
        );




    },
    fillUnitDataToForm: function(data) {
        var me = this;
        var filledFields = ['unit_id', 'productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number'];
       
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data[filledFields[x]]);
            }

        }
    },
    fillMasterCustomerData: function(records, prefix) {
        var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
        var me = this;
        var filledFields = ['customer_id', 'name', 'address', 'city_id', 'home_phone', 'office_phone',
            'zipcode', 'mobile_phone', 'fax', 'KTP_number', 'NPWP', 'email'];
       
        me.getFormdata().down('[name=customer_old_id]').setValue(records[0].data['customer_id']);
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records[0].data[filledFields[x]]);
            }

        }
    },
    getFinalData: function(formGetValues) {
        var finalData = formGetValues;
        finalData['customer01_id'] = finalData.customer_old_id;
        var newDate = finalData['changename_date'].split('-');
        newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0];
        finalData['changename_date'] = newDate;
        finalData['admistration_fee'] = toFloat(finalData['admistration_fee']);
      
        return finalData;
    },
    formDataAfterRender: function(el) {

        var me = this;
        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        if (state == 'create') {
            // el.down('#active').setValue(1);
            me.getFormdata().down('#btnSave').setDisabled(false);
        } else if (state == 'update') {

            var grid = me.getGrid();
            var store = grid.getStore();
            var detailModel = me.getGantinamadetailModel();
            var rec = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            var idChangeName = rec.data.changename_id;
          
            //store.model.setFields({name:'changename_id',type:'int'});
            store.model.setFields(detailModel.prototype.fields.getRange());
            store.load({params:{mode_read:'detail',changename_id:idChangeName},
                        callback:function(record){
                            //console.log(record);
                            record = store.getAt(0);
                            el.loadRecord(record);
                        }});
            //var userModel = me.getGantinamaModel(),fields = userModel.prototype.fields.getRange();
   
            //store.model.setFields(me.getUnitModel().prototype.fields.getRange());
    
           // var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
          //  el.loadRecord(record);
            me.getFormdata().down('#btnSave').setDisabled(true);
        }
    }




});