Ext.define('Erems.controller.Reward', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Reward',
    views: [
		'reward.Panel', 
		'reward.Grid', 
		'reward.FormSearch', 
		// 'reward.FormData', 
	],
    requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector', 'Erems.library.template.component.Clustercombobox'],
    stores: ['Reward','Mastercluster'],
    models: ['Reward','Mastercluster'],
    refs: [
        {
            ref: 'grid',
            selector: 'rewardgrid'
        },
        {
            ref: 'formsearch',
            selector: 'rewardformsearch'
        },
        {
            ref: 'formdata',
            selector: 'rewardformdata'
        },
    ],
    controllerName: 'reward',
    fieldName: 'purchaseletter_no',
    bindPrefixName: 'Reward',
    validationItems:[], 
    formWidth: 800,
	countLoadProcess: 0,
	localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
	},
	
    // constructor: function (configs) {
    //     this.callParent(arguments);
    //     var me = this;
    //     this.myConfig = new Erems.library.box.Config({
    //         _controllerName: me.controllerName
    //     });

    //     me.cbf = new Erems.template.ComboBoxFields();
    // },

    init: function(application) {
		var me = this;
		
		// if (typeof Mustache === "undefined") {
        //     Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

        //         if (typeof ApliJs === "undefined") {
        //             Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js', function () {

        //                 console.log("[INFO] ApliJs loaded.");

        //             }, function () {
        //                 // error load file
        //             });
        //         }


        //     }, function () {
        //         //  me.tools.alert.warning("Error load Prolibs.js file.");
        //     });

		// }
		
		// me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        // var events = new Erems.library.box.tools.EventSelector();
		
        this.control({
            test: me.eventMonthField,
            'rewardpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'rewardgrid': {
                afterrender: this.gridAfterRender,
				itemdblclick : function(){ return false; },
                itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange,
				listeners: {
                    load: function() {
                        me.jqueryBinding();
                    }
                }
            },
			'rewardgrid toolbar button[action=view]': {
                click: function() {
                    this.formDataShow('view');
                }
            },
           	'rewardgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
			'rewardformsearch': {
				afterrender: this.formSearchAfterRender
			},
            'rewardformsearch button[action=search]': {
                click: this.dataSearch
            },
            'rewardformsearch button[action=reset]': {
                click: this.dataReset
            },
            'rewardformdata': {
                afterrender: this.formDataAfterRender
            },
            'rewardformdata button[action=save]': {
                click: this.dataSave
            },
            'rewardformdata button[action=cancel]': {
                click: this.formDataClose
            },
			
        });
    },
	
	/*checkAllDetailLoadingProcess: function() {
        var me = this;
        if (me.countLoadProcess === 4) {
            me.getFormdata().up('window').body.unmask();
        }
	},*/
	gridAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
          
        grid = me.getGrid();      
        grid.store.on('load', function(store, records, options){
            me.jqueryBinding();      
		});  
		me.getGrid().getView().getGridColumns()[7].setVisible(true);
		me.getGrid().getView().getGridColumns()[10].setVisible(true);
		me.getGrid().getView().getGridColumns()[13].setVisible(true);
		me.getGrid().getView().getGridColumns()[16].setVisible(true);
		me.getGrid().getView().getGridColumns()[17].setVisible(true);
        // me.getGrid().down("pagingtoolbar").getStore().reload();

    },
    jqueryBinding: function(){
		var me = this;
        //inlineEdit
        me.checkboxInlineEdit('rewardsales', 'Reward Sales');
		me.checkboxInlineEdit('rewardcustomer', 'Reward Customer');
		me.checkboxInlineEdit('rewardtambahan', 'Reward Tambahan');		
		me.checkboxInlineEdit('is_bgb', 'BGB');		
		me.checkboxInlineEdit('bgb', 'Sudah BGB');	
        me.checkboxInlineEdit('promodate', 'Tanggal ST Promo ke Customer');  	
        // me.rewardHideFeature();

        //// added by Erwin.S 20042021
		me.checkboxInlineEdit('closing_fee_value', 'Closing Fee');   
		me.checkboxInlineEdit('blt_value', 'BLT');   
		me.checkboxInlineEdit('extrareward_value', 'Extra Reward');   
		me.checkboxInlineEdit('send_email', 'Send Email'); 
		//////////////////////////////

		//added by anas 21072021
        me.checkboxInlineEdit('rewardsales_coll', 'Reward Sales (Coll)');
        me.checkboxInlineEdit('rewardcustomer_coll', 'Reward Customer (Coll)');
        me.checkboxInlineEdit('rewardtambahan_coll', 'Reward Tambahan (Coll)');
        me.checkboxInlineEdit('bgb_coll', 'BGB (Coll)');		
		me.checkboxInlineEdit('bgb_done_coll', 'Sudah BGB (Coll)');	
		me.checkboxInlineEdit('closing_fee_coll', 'Closing Fee (Coll)');   
		me.checkboxInlineEdit('blt_coll', 'BLT (Coll)');   
		me.checkboxInlineEdit('extrareward_coll', 'Extra Reward (Coll)');  
        //end added by anas
    },
    checkboxInlineEdit: function(name, label){
		var me = this;

		if(name == 'send_email'){ //// added by Erwin.S 20042021 
			$('.' + name).click(function(event){
				var rows   = me.getGrid().getSelectionModel().getSelection();
				var store  = me.getGrid().getStore();
				var record = store.getAt(store.indexOf(rows[0]));

				var purchaseletter_id = record.get('purchaseletter_id');
				var purchaseletter_no = record.get('purchaseletter_no');
				var harga_total_jual  = record.get('harga_total_jual');
				var harga_netto       = record.get('harga_netto');
				var salesman          = record.get('salesman');

				var flag  = $(this).attr('flag');
				var title = $(this).attr('title_text');
				var nilai = accounting.unformat($("input[name=" + flag + "][data="+ purchaseletter_id +"]").val());

				var confirmmsg = label + ' ' + title + ' ?';

				Ext.Msg.confirm('Purchaseletter No [' + purchaseletter_no + ']', confirmmsg, function (btn) {
					if (btn == 'yes') {
						me.getGrid().up('window').mask('Sedang mengirim email ...');
						Ext.Ajax.request({
							url: 'erems/reward/read',
							params: {
								mode_read         : name,
								purchaseletter_id : purchaseletter_id, 
								harga_total_jual  : harga_total_jual, 
								harga_netto       : harga_netto,
								salesman          : salesman,
								title             : title,
								flag              : flag,
								nilai             : nilai,
							},
							success: function (response) {
								res = Ext.JSON.decode(response.responseText);
								if(res.success){
					                Ext.Msg.show({
										title   : 'Success',
										msg     : res.description,
										icon    : Ext.Msg.INFO,
										buttons : Ext.Msg.OK
					                });
					                store.reload();
					            }
					            else{
					                Ext.Msg.show({
										title   : 'Failure',
										msg     : 'Error : ' + res.description,
										icon    : Ext.Msg.ERROR,
										buttons : Ext.Msg.OK
					                });
				            	}

								me.getGrid().getStore().reload();
								me.getGrid().up('window').unmask();
							},
							error : function(){
								Ext.Msg.show({
									title   : 'Failure',
									msg     : 'Error : Pengiriman email gagal.',
									icon    : Ext.Msg.ERROR,
									buttons : Ext.Msg.OK
				                });

								me.getGrid().getStore().reload();
								me.getGrid().up('window').unmask();
							}
						});
					}
				});
			});
		}
		else{
			//// added by Erwin.S 20042021
	    	if(name == "closing_fee_value" || name == "blt_value" || name == "extrareward_value"){ 
				$("input[name='"+name+"']").each(function(){
			      	me.formatCurrency($(this), "blur");
				});

				$("input[name='"+name+"']").on({
				    keyup: function() {
				      	me.formatCurrency($(this));
				    },
				    blur: function() { 
				      	me.formatCurrency($(this), "blur");
				    },
				});
			}
			///////////////////////////


	        $("input[name='"+name+"']").change(function(event) {
				var rows  = me.getGrid().getSelectionModel().getSelection();
				var store = me.getGrid().getStore();

	            var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('purchaseletter_no') + ']';
	            var confirmmsg = 'Ubah Status ' + label + ' ?';

				purchaseletter_id = $(this).attr('data');

	            //added by anas 19022021
	            if(name == "promodate"){
	                var val = $(this).val();
	            }
	            //end added by anas 19022021
	            else if(name == "closing_fee_value" || name == "blt_value" || name == "extrareward_value"){ /// Added by Erwin.S 22042021
					var val = accounting.unformat($(this).val());
					confirmmsg = 'Ubah nilai ' + label + ' ?';
				}
	            else{                
	                var val = $(this).is(":checked") ? 1 : 0;
	            }
	            
	            /// Dikasih delay supaya ketika edit dan klik sembarang tempat confirm massage nya tetap di atas window grid nya
	            var tm = setTimeout(function() { /// Added by Erwin.S 22042021
	            	Ext.Msg.confirm('Purchaseletter No '+selectedRecord, confirmmsg, function (btn) {
						if (btn == 'yes') {
							me.getGrid().up('window').mask('Updating data, please wait ...');
							Ext.Ajax.request({
								url    : 'erems/reward/read',
								params : {
									mode_read : 'inlineEdit',
									id        : purchaseletter_id, 
									collumn   : name, 
									value     : val
								},
								success: function (response) {
									me.getGrid().getStore().reload();
									me.getGrid().up('window').unmask()
								}
							});
						}else{
		                    //added by anas 19022021
		                    if(name == "promodate")
		                    {
		                        $("input[name="+ name +"][data="+ purchaseletter_id +"]").val("");
		                    }
		                    //end added by anas 19022021
		                    else if(name == 'closing_fee_value' || name == 'blt_value' || name == 'extrareward_value'){ /// Added by Erwin.S 22042021
		                    	var old_value = $("input[name="+ name +"][data="+ purchaseletter_id +"]").attr('old_value');
								$("input[name="+ name +"][data="+ purchaseletter_id +"]").val(old_value);
								me.formatCurrency($("input[name="+ name +"][data="+ purchaseletter_id +"]"), "blur");
							}
		                    else{
		    					if(val == 0){
		    						$("input[name="+ name +"][data="+ purchaseletter_id +"]").prop('checked', true)
		    					}else{
		    						$("input[name="+ name +"][data="+ purchaseletter_id +"]").prop('checked', false)
		    					}
		                    }
						}
					})

	            	clearTimeout(tm);
	            }, 500);

				
							
	            // me.tools.ajax({
				// 	params: {mode_read: 'inlineEdit', id: purchaseletter_id, collumn: name, value: val },
	            //     success: function (data) {
	            //         p.setLoading(false);
	            //     }
	            // }); 
	        });

		}
		
	},
	/// Added by Erwin.S 20042021
	formatNumber : function(n){
		// format number 1000000 to 1,234,567
		return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	/// Added by Erwin.S 20042021
	formatCurrency : function(input, blur) {
		var me = this;
		// appends $ to value, validates decimal side
		// and puts cursor back in right position.
  
		// get input value
		var input_val = input.val();
  
		// don't validate empty input
		// if (input_val === "") { return; }

		// original length
		var original_len = input_val.length;

		// initial caret position 
		var caret_pos = input.prop("selectionStart");
    	
  		// check for decimal
  		if (input_val.indexOf(".") >= 0) {

		    // get position of first decimal
		    // this prevents multiple decimals from
		    // being entered
		    var decimal_pos = input_val.indexOf(".");

		    // split number by decimal point
		    var left_side = input_val.substring(0, decimal_pos);
		    var right_side = input_val.substring(decimal_pos);

		    // add commas to left side of number
		    left_side = me.formatNumber(left_side);

		    // validate right side
		    right_side = me.formatNumber(right_side);
		    
		    // On blur make sure 2 numbers after decimal
		    if (blur === "blur") {
		      right_side += "00";
		    }
		    
		    // Limit decimal to only 2 digits
		    right_side = right_side.substring(0, 2);

		    // join number by .
		    input_val = left_side + "." + right_side;

  		} 
  		else {
		    // no decimal entered
		    // add commas to number
		    // remove all non-digits
		    input_val = me.formatNumber(input_val);
    
		    // final formatting
		    if (blur === "blur") {
				input_val += ".00";
		    }
	 	}
  
	  	// send updated string to input
	  	input.val(input_val);
	},
	
	// rewardHideFeature: function(){
    //     var me=this;
    //     if($("#WINDOW-mnuReward_header_hd-textEl").html()=="Reward"){
    //         $("#WINDOW-mnuReward-body .x-toolbar.x-docked-top").hide();
    //         $("#WINDOW-mnuReward input[name=is_rewardsales_done]").attr("disabled", true);
    //         me.getGrid().getView().getGridColumns()[25].setVisible(false); //hide edit delete
    //     }
	// },
	
	// gridItemDblClick: function(el) {
    //     var me = this;
    //     if($("#WINDOW-mnuReward_header_hd-textEl").html()!=="Reward"){
    //         btnEdit = el.up('panel').down('#btnEdit'),
    //         state = (btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');
    //         me.execAction(el, state);
    //       }
    // },
	
	// gridSelectionChange: function() {
    //     var me = this;
    //     var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
	// 	grid.down('#btnView').setDisabled(row.length != 1);
    // },
		
	// gridActionColumnClick: function(view, cell, row, col, e) {
    //     var me = this;
    //     var record = me.getGrid().getStore().getAt(row);
    //     var m = e.getTarget().className.match(/\bact-(\w+)\b/);
    //     me.getGrid().getSelectionModel().select(row);
      
    //     if (m) {
    //         switch (m[1]) {
    //             case 'view':
    //                 me.formDataShow('view');
    //                 break;
    //         }
    //     }
    // },
	
    // formDataAfterRender: function(el) {

    //     var me = this;
    //     me.loadComboBoxStore(el);
    //     var state = el.up('window').state;
		
		
	// 	if (state == 'create') {
    //         // el.down('#active').setValue(1);
    //         //me.getFormdata().down('#btnSave').setDisabled(false);
    //     } else if (state == 'update' || state == 'read') {

	// 		me.countLoadProcess = 0;
    //         me.getFormdata().up('window').body.mask('Loading data, please wait ...');
			
	// 		var grid = me.getGrid();
    //         var store = grid.getStore();
	// 		var form = me.getFormdata();

    //         var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
    //         el.loadRecord(record);
			
    //     }
    // },
});