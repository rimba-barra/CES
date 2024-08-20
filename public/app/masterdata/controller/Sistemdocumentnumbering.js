Ext.define('Masterdata.controller.Sistemdocumentnumbering', {
    extend: 'Ext.app.Controller',
	
    alias: 'controller.Sistemdocumentnumbering',

	models: [
        'Sistemdocumentnumbering'
    ],
    stores: [
        'Sistemdocumentnumbering',
        'Projectbyuser',
        'Ptbyuser',
        'Appsbyuser'
    ],
    views: [
        'sistemdocumentnumbering.Panel',
		'sistemdocumentnumbering.FormSearch',
		'sistemdocumentnumbering.Grid',
		'sistemdocumentnumbering.FormData'
    ],
    
    refs: [
        {
            ref: 'grid',
            selector: 'SistemdocumentnumberingGrid'
        },     
        {
            ref: 'formsearch',
            selector: 'SistemdocumentnumberingFormSearch'
        },
        {
            ref: 'formdata',
            selector: 'SistemdocumentnumberingFormData'
        }     
    ],    

    init: function (application) {
		var me = this;
		
		me.selfName = me.self.getName().split('.',3)[2];
        this.control({
            'SistemdocumentnumberingPanel': {
				beforerender: this.panelBeforeRender,
            }, 
            
            'SistemdocumentnumberingFormSearch': {
                afterrender: this.formSearchAfterRender
            },  
            
            'SistemdocumentnumberingFormSearch #apps_id': {
                change: function(el) { me.checkProject('formsearch', el.getValue()); }
            },              
            
            'SistemdocumentnumberingFormSearch #project_id': {
                change: function(el) {                 		
                		me.checkPt('formsearch', me.getFormsearch().getForm().findField('apps_id').getValue(), el.getValue()); 
                	}
            },      
            
            'SistemdocumentnumberingFormSearch #reset_type': {
                change: function() { me.checkResetType('formsearch'); }
            },     
            
            'SistemdocumentnumberingFormSearch #year': {
                change: function() { me.checkDay('formsearch'); }
            },  
            
            'SistemdocumentnumberingFormSearch #month': {
                change: function() { me.checkDay('formsearch'); }
            },            
            
            'SistemdocumentnumberingFormSearch button[action=search]': {
                click: this.dataSearch
            },

            'SistemdocumentnumberingFormSearch button[action=reset]': {
                click: this.dataReset
            }, 
            
            'SistemdocumentnumberingGrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                selectionchange: this.gridSelectionChange
            },            

            'SistemdocumentnumberingFormData': {
            	beforerender: this.formDataBeforeRender,
            	afterrender: this.formDataAfterRender
            },  

            'SistemdocumentnumberingFormData #apps_id': {
                select: function(el) { me.checkProject('formdata', el.getValue()); }
            }, 
            
            'SistemdocumentnumberingFormData #project_id': {
                select: function(el) { me.checkPt('formdata', me.getFormdata().getForm().findField('apps_id').getValue(), el.getValue()); }
            }, 
            
            'SistemdocumentnumberingFormData #reset_type': {
                change: function() { me.checkResetType('formdata'); }
            },     
            
            'SistemdocumentnumberingFormData #year': {
                change: function() { me.checkDay('formdata'); }
            },  
            
            'SistemdocumentnumberingFormData #month': {
                change: function() { me.checkDay('formdata'); }
            }, 
            
            'SistemdocumentnumberingFormData #format': {
                blur: function(el) { me.checkCounter(el.getValue()); }
            },             
            
            'SistemdocumentnumberingFormData button[action=save]': {
                click: this.dataSave
            },             
            
            'SistemdocumentnumberingFormData button[action=cancel]': {
                click: this.formDataClose 
            }
        });    	
    }, 
    
	panelBeforeRender: function(el) {
		var me = this;
		setupObject(el, me.execAction, me);		
		if (typeof Ext.StoreManager.lookup('AppsbyuserStore') == 'undefined') {		
			Ext.create('Masterdata.store.Appsbyuser', {
				storeId: 'AppsbyuserStore',
				sorters: [{
					property: 'apps_name',
					direction: 'ASC'
				}]		 
			}).load({params:{limit:0}});
		}		
    	if (typeof Ext.StoreManager.lookup('ProjectbyuserStore') == 'undefined') {
			Ext.create('Masterdata.store.Projectbyuser', {
				storeId: 'ProjectbyuserStore',
				sorters: [{
					property: 'project_name',
					direction: 'ASC'
				}]		 
			});
		}
    	if (typeof Ext.StoreManager.lookup('PtbyuserStore') == 'undefined') {
			Ext.create('Masterdata.store.Ptbyuser', {
				storeId: 'PtbyuserStore',
				sorters: [{
					property: 'pt_name',
					direction: 'ASC'
				}]		 
			});
		}
    	if (typeof Ext.StoreManager.lookup('ProjectbyuserStore2') == 'undefined') {
			Ext.create('Masterdata.store.Projectbyuser', {
				storeId: 'ProjectbyuserStore2',
				sorters: [{
					property: 'project_name',
					direction: 'ASC'
				}]		 
			});
		}
    	if (typeof Ext.StoreManager.lookup('PtbyuserStore2') == 'undefined') {
			Ext.create('Masterdata.store.Ptbyuser', {
				storeId: 'PtbyuserStore2',
				sorters: [{
					property: 'pt_name',
					direction: 'ASC'
				}]		 
			});
		}   		
	},     
	
	execAction: function(el, action, me){ 
		if (!action) { action = ''; }
		if (!me) { me = this; }
		switch (action) {
			case me.selfName+'Create':
				me.formDataShow('create');
				break;
			case me.selfName+'Update':
				me.formDataShow('update');
				break;
			case me.selfName+'Delete':
				me.dataDestroy();
				break;				
		}
	}, 	
	
    dataSearch: function() {
        resetTimer();
        var me = this;               
        var store = me.getGrid().getStore();
        var fields = me.getFormsearch().getForm().getFieldValues();
		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.load();	 		
    },	
    
    dataReset: function() {
        var me = this;
        me.getFormsearch().getForm().reset();
        me.dataSearch();
    },	
    
    gridAfterRender: function() { 
        var me = this;
        me.dataReset();        
    },	
    
	gridSelectionChange: function(el, selected) {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();	
        grid.down('#btnEdit').setDisabled(row.length < 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);		
	},
	
	gridItemDblClick: function(el) {
        var me = this;
        me.formDataShow('update');
	},  
	
	formDataShow: function(state) { 
        var me = this;
        var formtitle, formicon, widget;
        switch(state){
			case 'create': 
				formtitle = 'Add Items';     
				formicon = 'icon-form-add';
				break;
			case 'update': 
				formtitle = 'Edit Item';    
				formicon = 'icon-form-edit';  
				break;
        }
        var winId = 'win-sistemdocumentnumberingformdata';
        var win = desktop.getWindow(winId);	
        if(!win){ 
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 500,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Masterdata.view.sistemdocumentnumbering.FormData'),
                state: state
            });        
        }
        win.show();
    },	
    
    dataSave: function() { 
        var me = this;
        var form = me.getFormdata().getForm(), data = [], url, counter, confirmmsg = 'Counter requested is smaller than current!';
        if (form.isValid()) {
            resetTimer();			
            var store = me.getGrid().getStore();
            me.getFormdata().up('window').body.mask('Saving data, please wait ...'); 
            switch(me.getFormdata().up('window').state.toLowerCase()){
                case 'create':  
                	store.removeAll();
					store.add(form.getValues());     
					for(var i=0; i<store.getCount(); i++)
			        {
						store.each(function(record,idx){
							if(i == idx){ data[i] = record.data; }
					    });        	
			        }					
					break;
                case 'update': 
                	var record =  me.getGrid().getSelectionModel().getSelection()[0]; 
					var idProperty = store.getProxy().getReader().getIdProperty(); 
					var rec = store.getById(parseInt(form.findField(idProperty).getValue(),10));       
					rec.beginEdit();        
					rec.set(form.getValues());            
					rec.endEdit();   
					data[0] = store.getAt(record.index).data;
					break;        
                default:        
					return;
            }

	        switch(me.getFormdata().up('window').state.toLowerCase()){
	        	case 'create': url = 'masterdata/sistemdocumentnumbering/create';break;
	        	case 'update': url = 'masterdata/sistemdocumentnumbering/update';break;
	        	default: return;
	        }
	        
	        var ajax = function() {
				  Ext.Ajax.request({
				  url: url,
				  params:'data='+Ext.encode(data),
			      success:function(response){ 
			      	me.getFormdata().up('window').body.unmask();
					if(Ext.decode(response.responseText).success == true)
					{						
		                Ext.Msg.show({
		                    title: 'Success', 
		                    msg: 'Data saved successfully.',
		                    icon: Ext.Msg.INFO,
		                    buttons: Ext.Msg.OK,
		                    fn: function(){ me.formDataClose(); }
		                });	
		                store.reload();	
					}
					else {
		                Ext.Msg.show({
		                    title: 'Failure', 
		                    msg: Ext.decode(response.responseText).message,
		                    icon: Ext.Msg.ERROR,
		                    buttons: Ext.Msg.OK,
		                    fn: function(){ me.getFormdata().down('#error').setText('<b>Error: </b><br>'+Ext.decode(response.responseText).message, false); }
		                });		
		                store.reload();			                
					}
			      }
				  });	        	
	        };	        
	      
	        if(me.getFormdata().up('window').state.toLowerCase() == 'update')
	        {	
				  Ext.Ajax.request({
				  url: 'masterdata/sistemdocumentnumbering/getsistemdocnocounter',
				  params:'data='+Ext.encode(data),
			      success:function(response){ 
					if(Ext.decode(response.responseText).success == true)
					{						
		                counter = parseInt(Ext.decode(response.responseText).data);
		                if(parseInt(data[0].counter) < counter) //untuk ngecek inputan counter, jika lebih kecil dr db, maka di kasih warning
		                {	
		                	Ext.Msg.confirm('Update Data', confirmmsg, function(btn){
		                		if (btn=='yes'){   
									  ajax();		                			
		                		}
		                		else {
		                			me.formDataClose();store.reload();	
		                		}
		                	});
		                }
		                else { ajax(); }
					}
			      }
				  });		        	
	        }
	        else {
					  ajax();		        	
	        }	      
        }
    },   
    
    dataDestroy: function() {
        var me = this;		
        var rows = me.getGrid().getSelectionModel().getSelection();		
        if (rows.length<1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length+' record'+(rows.length>1?'s':'');
            var store = me.getGrid().getStore();
            if (rows.length==1) {
                var application_name = '['+store.getAt(rows[0].index).get('application_name')+']';
                var project_name = '['+store.getAt(rows[0].index).get('project_name')+']';
                var pt_name = '['+store.getAt(rows[0].index).get('pt_name')+']';
                var module_name = '['+store.getAt(rows[0].index).get('module_name')+']';
                var selectedRecord = 'application_name '+application_name+', project_name '+project_name+', pt_name '+pt_name+', module_name '+module_name;
                confirmmsg = 'Delete format for '+selectedRecord+' ?';
                failmsg = 'Error: Unable to delete '+selectedRecord+'.';
            } else {				
                confirmmsg = 'This action will delete '+recordcounttext+'.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }		
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn){
                if (btn=='yes'){
                    resetTimer();					
                    var msg = function(){ me.getGrid().up('window').mask('Deleting data, please wait ...'); };
                    for(var i=0;i<rows.length;i++){ store.remove(rows[i]); }
                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s){
                            me.getGrid().up('window').unmask();						
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total,10);
                            var successmsg = (rows.length==1 ? selectedRecord : (successcount!=rows.length?successcount+' of ':'')+recordcounttext)+' deleted successfully.';
                            store.un('beforesync', msg);							
                            store.reload();
							if (typeof Ext.StoreManager.lookup('SistemdocumentnumberingStore') != 'undefined') {
								Ext.StoreManager.lookup('SistemdocumentnumberingStore').load({params:{limit:0}});
							}
                            Ext.Msg.show({
                                title:'Success', 
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });		
                        },
                        failure: function(){
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title:'Failure', 
                                msg: failmsg+' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },    
	
    formDataClose: function() {
        var me = this;
        me.getFormdata().up('window').close();
    },  	
    
    checkDay: function(state) {
    	var me = this, form = (state == 'formdata' ? me.getFormdata().getForm() : me.getFormsearch().getForm()), 
    		storeDay = form.findField('day').getStore(),
    		year = form.findField('year').getValue(), month = form.findField('month').getValue(),
    		lastday, d = 1, days = [];
    		
    	if(year && month)
    	{
    		lastday = new Date(year, month, 0).getDate();
    	}
	    while(d<=lastday){
	        days.push([d]);
	        d++;
	    } 
	    storeDay.removeAll();
	    storeDay.add(days);
    },
    
    checkProject: function(state, apps_id, callback) { 
    	var me = this,  form = (state == 'formdata' ? me.getFormdata().getForm() : me.getFormsearch().getForm()), 
    		store = (state == 'formdata' ? Ext.StoreManager.lookup('ProjectbyuserStore') : Ext.StoreManager.lookup('ProjectbyuserStore2')); 
    		
		store.getProxy().setExtraParam('apps_id', apps_id);
		store.getProxy().setExtraParam('limit', 0);
        store.load({
        	callback: function() {
        		if (Ext.isFunction(callback)) callback();	
        	}
        });     		
    	form.findField('project_id').setReadOnly(false);
    },
    
    checkPt: function(state, apps_id, project_id, callback) { 
    	var me = this,  form = (state == 'formdata' ? me.getFormdata().getForm() : me.getFormsearch().getForm()), 
    		store = (state == 'formdata' ? Ext.StoreManager.lookup('PtbyuserStore') : Ext.StoreManager.lookup('PtbyuserStore2'));
	
		store.getProxy().setExtraParam('apps_id', apps_id);
		store.getProxy().setExtraParam('project_id', project_id);
		store.getProxy().setExtraParam('limit', 0);
        store.load({
        	callback: function() {
        		if (Ext.isFunction(callback)) callback();	
        	}
        });     		
    	form.findField('pt_id').setReadOnly(false);
    },  
    
    checkResetType: function(state) {
    	var me = this;
    	var form = (state == 'formdata' ? me.getFormdata().getForm() : me.getFormsearch().getForm()),
    		reset_type = form.findField('reset_type').getValue();    	
    	
    	if(reset_type == 'Y')
    	{	
    		form.findField('year').allowBlank = false;
    		form.findField('year').setReadOnly(false);
    		form.findField('month').allowBlank = true;
    		form.findField('month').setReadOnly(true);
    		form.findField('day').allowBlank = true;
    		form.findField('day').setReadOnly(true);  
    		form.findField('month').setValue('');
			form.findField('day').setValue('');	
    	}
    	else if(reset_type == 'M')
	    	{
	    		form.findField('month').allowBlank = false;
	    		form.findField('month').setReadOnly(false);
	    		form.findField('year').allowBlank = false;
	    		form.findField('year').setReadOnly(false);
	    		form.findField('day').allowBlank = true;
	    		form.findField('day').setReadOnly(true); 	
	    		form.findField('day').setValue('');
	    	}
	    	else if(reset_type == 'D')
	    		{
		    		form.findField('day').allowBlank = false;
		    		form.findField('day').setReadOnly(false);
		    		form.findField('year').allowBlank = false;
		    		form.findField('year').setReadOnly(false);
		    		form.findField('month').allowBlank = false;
		    		form.findField('month').setReadOnly(false); 		    		
	    		}	
			   else if(reset_type == 'X')
			    	{
			    		form.findField('year').allowBlank = true;
			    		form.findField('month').allowBlank = true;
			    		form.findField('day').allowBlank = true;
			    		form.findField('year').setReadOnly(true);
			    		form.findField('month').setReadOnly(true);
			    		form.findField('day').setReadOnly(true);
			    		form.findField('year').setValue('');
			    		form.findField('month').setValue('');
			    		form.findField('day').setValue('');			    		
			    	}	    		
    },  
    
    checkCounter: function(format) {
    	var me = this, open_sign = '[', close_sign = ']', keyword,
    		opensign_index = 0, closesign_index = 0, string_temp, counter_len = 0,
    		form = me.getFormdata().getForm(); 
    	
		string_temp = format;
		while(string_temp.indexOf(open_sign) >= 0)
		{	
			opensign_index = string_temp.indexOf(open_sign);
			closesign_index = string_temp.indexOf(close_sign,opensign_index);
			keyword = string_temp.substr(opensign_index+1, closesign_index-opensign_index-1);
			
			if(keyword.toLowerCase().indexOf('x') >= 0)
			{
				counter_len = keyword.length;												
			}
			string_temp = string_temp.substr(closesign_index+1, string_temp.length-closesign_index);			
		}  
		form.findField('counter').inputEl.set({maxLength: counter_len});
		form.findField('counter').maxLength = counter_len;
		if(counter_len == 0)
		{
			form.findField('counter').setValue('');
		}
    },
    
    formDataBeforeRender: function(el) { 
    	var me = this, state = el.up('window').state, form = me.getFormdata().getForm(); 
    	el.down('#apps_id').store =  Ext.StoreManager.lookup('AppsbyuserStore');
    	el.down('#project_id').store =  Ext.StoreManager.lookup('ProjectbyuserStore');
        el.down('#pt_id').store =  Ext.StoreManager.lookup('PtbyuserStore');
        if(state == 'update')
        {
        	var record =  me.getGrid().getSelectionModel().getSelection()[0];
        	form.findField('sistemdocumentnumber_id').setValue(record.get('sistemdocumentnumber_id'));
        	form.findField('apps_id').setValue(record.get('apps_id'));
        	me.checkProject('formdata', record.get('apps_id'), function() { form.findField('project_id').setValue(record.get('project_id')); });
        	me.checkPt('formdata', record.get('apps_id'), record.get('project_id'), function() { form.findField('pt_id').setValue(record.get('pt_id')); });
        	form.findField('module_name').setValue(record.get('module_name'));
        	form.findField('reset_type').setValue(record.get('reset_type'));
        	form.findField('format').setValue(record.get('format'));
        	form.findField('year').setValue(record.get('year'));
        	form.findField('month').setValue(record.get('month'));
        	form.findField('day').setValue(record.get('day'));
        	form.findField('counter').setValue(record.get('counter'));
        	form.findField('description').setValue(record.get('description'));
        	//form.findField('is_default').setValue(record.get('is_default'));
        	
        	form.findField('apps_id').setReadOnly(true);
        	form.findField('project_id').setReadOnly(true);
        	form.findField('pt_id').setReadOnly(true);
        	form.findField('module_name').setReadOnly(true);
        	form.findField('reset_type').setReadOnly(true);
        	form.findField('year').setReadOnly(true);
        	form.findField('month').setReadOnly(true);
        	form.findField('day').setReadOnly(true);        	
        }
    },     
    
    formDataAfterRender: function(el) {
    	var me = this, form = me.getFormdata().getForm();
        me.checkCounter(form.findField('format').getValue());
    },    
    
    formSearchAfterRender: function(el) {
    	el.down('#apps_id').store =  Ext.StoreManager.lookup('AppsbyuserStore');
    	el.down('#project_id').store =  Ext.StoreManager.lookup('ProjectbyuserStore2');
        el.down('#pt_id').store =  Ext.StoreManager.lookup('PtbyuserStore2');
    }
});