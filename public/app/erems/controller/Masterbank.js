Ext.define('Erems.controller.Masterbank', {
    extend: 'Main.library.Controller',
    
	alias: 'controller.Masterbank',
	
	models: [
        'Masterbank'
    ],
    stores: [
        'Masterbank'
    ],
    views: [
        'masterbank.Panel',
		'masterbank.FormSearch',
		'masterbank.Grid',
		'masterbank.FormData'
    ],

    constructor: function (application) {
        var me = this, meNameSplit = me.self.getName().split('.');

        me.appsName   = meNameSplit[0];
        me.selfName   = meNameSplit[(meNameSplit.length - 1)];
        me.formalName = me.formalName || me.selfName;

        me.mainPanel      = me.selfName + 'Panel';
        me.mainGrid       = me.selfName + 'Grid';
        me.mainFormSearch = me.selfName + 'FormSearch';
        me.mainFormData   = me.selfName + 'FormData';

        me.refs = (me.refs || []).concat([
            {ref: 'MainPanel', selector: me.mainPanel},
            {ref: 'MainGrid', selector: me.mainPanel + ' ' + me.mainGrid},
            {ref: 'MainFormSearch', selector: me.mainPanel + ' ' + me.mainFormSearch},
            {ref: 'MainFormData', selector: me.mainFormData}
        ]);

        me.callParent(arguments);

        //custom
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

    },

    init: function (application) {
        var me = this;

        me.control(me.mainPanel, {
            beforerender : me.mainPanelBeforeRender,
            afterrender  : me.mainPanelAfterRender,
            removed      : me.mainPanelRemoved
        });

        me.control(me.mainPanel + ' gridpanel', {
            beforerender    : me.gridPanelBeforeRender,
            afterrender     : me.gridPanelAfterRender,
            selectionchange : me.gridPanelSelectionChange,
            itemdblclick    : me.gridPanelItemDblClick
        });

        me.control(me.mainFormSearch, {
            beforerender : me.formSearchBeforeRender,
            afterrender  : me.formSearchAfterRender
        });

        me.control(me.mainFormData, {
            beforerender : me.formDataBeforeRender,
            afterrender  : me.formDataAfterRender,
            removed      : me.formDataRemoved
        });
    },
    
    gridPanelSelectionChange: function() {
        var me = this;
        var grid = me.getMainGrid(), row = grid.getSelectionModel().getSelection();
        var edit = grid.down('#btnEdit');
        var deleteb = grid.down('#btnDelete');
        var view = grid.down('#btnView');
        if (edit !== null) {
            edit.setDisabled(row.length != 1);
        }
        if (deleteb !== null) {
            deleteb.setDisabled(row.length < 1);
        }
        if (view !== null) {
            view.setDisabled(row.length != 1);
        }
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
    dataSave: function(o){
        var me = this, formData = o.up('form');   
        var createStatus = true;  

        if (formData.getForm().isValid()){
            var data = formData.getValues(), fieldName = [], details = {}, detailsremoved = {};
            var storeData = me.getMainGrid().getStore();

            if(formData.state == me.actionName.destroy){
                for(var i=0;i<storeData.data.items.length;i++){
                    if(storeData.data.items[i].data.code == formData.getValues().code){
                        createStatus = false;
                    }
                }
            }
            
            /*===================================================== added by TB 19 Juli 2016 */
            formData.store.extraParam[me.paramName.detailsData] = null;
            formData.store.extraParam[me.paramName.detailsremovedData] = null;
            /*===================================================== end added by TB 19 Juli 2016 */
            
            formData.store.model.getFields().forEach(function(f){ fieldName.push(f.name); });
            formData.query('combobox').forEach(function(c) { var itemDisplay = c.displayField; if (fieldName.indexOf(itemDisplay)!=-1) data[itemDisplay] = c.getRawValue(); });
            formData.query('gridpanel').forEach(function(g) { 
                if (g.isVisible() && !g.isDisabled()) {                 
                    var gstore = g.getStore(), keyId = g.getItemId().toLowerCase().replace('grid','');
                    var detailsdata = gstore.getModifiedRecords(); if (detailsdata.length) { details[keyId] = Ext.pluck(detailsdata, 'data'); data['detailschanged'] = 1; }
                    var removeddata = gstore.getRemovedRecords(); if (removeddata.length) { detailsremoved[keyId] = Ext.pluck(removeddata, 'data'); data['detailschanged'] = 1; }
                }
            });
            if (Ext.Object.getSize(details)) formData.store.extraParam[me.paramName.detailsData] = Ext.encode(details);
            if (Ext.Object.getSize(detailsremoved)) formData.store.extraParam[me.paramName.detailsremovedData] = Ext.encode(detailsremoved);            
            

            if (!Ext.isFunction(formData.store.processFn.callback)) {
                formData.store.processFn.callback = function(s) {

                    var stor = this, sender = formData.sender.bindEl ? formData.sender.up('window').down('#'+formData.bindEl) : formData.sender;
                    if (Ext.isObject(sender)) {
                        Ext.Object.each(formData.refFields, function(k, v) {
                            if (sender.getItemId()==v.getItemId()) {
                                if (formData.state==me.actionName.create) {
                                    var newData = stor.getById(Math.max.apply(null, stor.data.keys));
                                    v.setValue(newData.get(v.getItemId()));
                                }
                            } else {
                                v.setValue(formData.down('#'+k).getValue());
                            }
                        });
                    }
                };
            }           
            if (formData.store.syncStore) {
                if (!Ext.isFunction(formData.store.processFn.successMsgBoxClose)) formData.store.processFn.successMsgBoxClose = function() { me.formDataClose(o); };
            } else {
                if (!Ext.isFunction(formData.store.processFn.postProcess)) formData.store.processFn.postProcess = function(){ me.formDataClose(o); };               
            }

            if(createStatus){
                me.dataProcess({sender:o, state:formData.state, store:formData.store, record:formData.record, data:data});            
            }else{
                Ext.Msg.show({
                    title: 'Failure',
                    msg: '<br/>The data may have been used.',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    dataProcess: function(args) {
        if (!args || !args.sender || !args.state || !args.store) return false;      
        var me = this, recordLength = 0, processMsgLoading = 'Processing', processMsgSuccess = 'Success', processMsgFailure = 'Failure', deleteRecordInfo, senderParent = args.sender.up('panel');
        var syncStore = function(){
            // if (!args.store.syncStore) return false;            

            args.store.on({
                beforesync: {
                    fn: function(){
                        if (Ext.isFunction(args.store.processFn.beforeSync)) if (args.store.processFn.beforeSync()===false) return false;
                        Ext.Object.each(args.store.extraParam, function(k, v){ args.store.getProxy().setExtraParam(k, v); });
                        senderParent.setLoading(processMsgLoading+', please wait ...');
                    }, scope:this, single:true                  
                }
            });
            
            args.store.sync({
                callback: function(){
                    senderParent.setLoading(false);
                    Ext.Object.each(args.store.extraParam, function(k, v){ delete args.store.getProxy().extraParams[k]; });
                    if (Ext.isFunction(args.store.processFn.afterSync)) if (args.store.processFn.afterSync()===false) return false;
                    args.store.processFn = {};
                },
                success: function(s){
                    if (args.state == me.actionName.destroy){
                        var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total,10);
                        var res          = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
                        
                        if(isNaN(successcount)){
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: '<br/>The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }else{
                            processMsgSuccess = (recordLength==1 ? deleteRecordInfo : (successcount!=recordLength?successcount+' of ':'')+deleteRecordInfo) + ' deleted successfully.';
                            Ext.Msg.show({ title:'Success', msg:processMsgSuccess, icon:Ext.Msg.INFO, buttons:Ext.Msg.OK, fn:args.store.processFn.successMsgBoxClose });  
                        }
                        var storeIdToFind = args.store.refStoreName || args.store.storeId;
                        Ext.StoreManager.each(function(regstore){
                            if (regstore.storeId==storeIdToFind || regstore.storeId==storeIdToFind+'Store' || regstore.storeId.indexOf('-'+storeIdToFind+'-')!=-1 || regstore.storeId.indexOf('~'+storeIdToFind+'~')!=-1) { 
                                var cfg = {};                               
                                if (regstore.storeId==args.store.storeId) { cfg = {callback:args.store.processFn.callback}; } 
                                regstore.reload(cfg);
                            } 
                        });     
                    }else{
                        if(Ext.decode(s.operations[0].response.responseText).total != 1){
                            Ext.Msg.show({ title:'Warning', msg:Ext.decode(s.operations[0].response.responseText).total[0].message, icon:Ext.Msg.WARNING, buttons:Ext.Msg.OK, fn:args.store});    
                        }else{
                            if (Ext.isFunction(args.store.processFn.success)) args.store.processFn.success();
                            processMsgSuccess = "Success";
                            Ext.Msg.show({ title:'Success', msg:processMsgSuccess, icon:Ext.Msg.INFO, buttons:Ext.Msg.OK, fn:args.store.processFn.successMsgBoxClose });    
                            var storeIdToFind = args.store.refStoreName || args.store.storeId;
                            Ext.StoreManager.each(function(regstore){
                                if (regstore.storeId==storeIdToFind || regstore.storeId==storeIdToFind+'Store' || regstore.storeId.indexOf('-'+storeIdToFind+'-')!=-1 || regstore.storeId.indexOf('~'+storeIdToFind+'~')!=-1) { 
                                    var cfg = {};                               
                                    if (regstore.storeId==args.store.storeId) { cfg = {callback:args.store.processFn.callback}; } 
                                    regstore.reload(cfg);
                                } 
                            });
                        }
                    }
                },
                failure: function(){
                    args.store.rejectChanges();
                    if (Ext.isFunction(args.store.processFn.failure)) args.store.processFn.failure();
                    Ext.Msg.show({ title:'Failure', msg:processMsgFailure, icon:Ext.Msg.ERROR, buttons:Ext.Msg.OK, fn:args.store.processFn.failureMsgBoxClose });
                }
            });         
        };
        args.state = args.state.toUpperCase();      
        if (!Ext.isObject(args.store.processFn)) args.store.processFn = {};             
        if ((args.state==me.actionName.update || args.state==me.actionName.destroy)) {
            recordLength = args.record.length; if (!args.record || recordLength<1) { Ext.Msg.alert('Info', 'No record selected !'); return false; }         
        }
        if (Ext.isFunction(args.store.processFn.preProcess)) if (args.store.processFn.preProcess()===false) return false;
        if (args.state!=me.actionName.destroy) {
            if (!args.data) return false;
            switch (args.state) {
                case me.actionName.create:              
                    processMsgLoading = 'Creating new data';
                    processMsgSuccess = 'Data created successfully.';
                    processMsgFailure = 'ERROR: Unable to create data.';
                    args.store.add(args.data);
                    break;
                case me.actionName.update:              
                    processMsgLoading = 'Updating data';
                    processMsgSuccess = 'Data updated successfully.';
                    processMsgFailure = 'ERROR: Unable to update data.';
                        args.record.beginEdit(); /*===================================================== added by TB 19 Juli 2016 */
                    args.record.set(args.data);
                        args.record.endEdit(); /*===================================================== added by TB 19 Juli 2016 */
                    break;
            }
            syncStore();
        } else if (args.state==me.actionName.destroy) {
            var confirmMsg;             
            processMsgLoading = 'Deleting data';
            if (recordLength==1) {                  
                deleteRecordInfo = args.store.deleteRecordInfo || args.record[0].get(me.selfName.toLowerCase()+'_name') || 'data';                  
                processMsgFailure = 'ERROR: Unable to delete '+deleteRecordInfo+'.';
                confirmMsg = 'Delete '+deleteRecordInfo+' ?';
            } else {                    
                deleteRecordInfo = recordLength+' record'+(recordLength>1?'s':'');                                  
                processMsgFailure = 'ERROR: Unable to delete data.';
                confirmMsg = 'This action will delete '+deleteRecordInfo+'.<br />Continue ?';
            }
            processMsgFailure +='<br /><br />Data may have been used and cannot be deleted or data is already deleted.<br />Please refresh the data list or try to deactivate the data if no longer used.';
            args.store.confirmDestroy = args.store.confirmDestroy || true;
            if (args.store.confirmDestroy) {
                Ext.Msg.confirm('Delete Data', confirmMsg, function(btn){ 
                    if (btn=='yes') {
                        for(var i=0;i<recordLength;i++){ args.store.remove(args.record[i]); }
                        syncStore();
                    }
                });
            } else {
                for(var i=0;i<recordLength;i++){ args.store.remove(args.record[i]); }
                syncStore();
            }
        }
        if (Ext.isFunction(args.store.processFn.postProcess)) args.store.processFn.postProcess();
        if (!args.store.syncStore) args.store.processFn = {};
    }
});