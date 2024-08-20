Ext.define('Hrd.minic.leavegiving.GenerateYearly', {
    extend: 'Hrd.library.box.tools.Minic',
    formAlias: 'leavegivingyearlyformdata',
    requires: ['Hrd.library.box.tools.Tools', 'Hrd.library.box.Config'],
    refs: [
        {
            ref: 'formyearly',
            selector: 'leavegivingyearlyformdata'
        }
    ],
    tools: null,
    config: null,
    getForm: function() {
        return this.getController().getFormyearly();
    },
    controls: function() {
        var me = this;

        var control = {
            'leavegivingyearlyformdata textfield[name=start_use]': {
                blur: function(el) {
                    var year = me.tools.intval(me.tools.validDateInput(el.getValue(), me.config));
                    el.setValue(year);
                    var duration = me.tools.intval(me.getController().expireDuration);
                    var d = new Date(year+duration-1, (12 - 1), 31);

                    el.up("form").down("[name=expired_date]").setValue(d);
                    el.up("form").down("[name=extension_date]").setValue(d);
                }
            },
            'leavegivingyearlyformdata checkbox[name=base_hire_date]': {
                change: function(el, val) {
                    me.baseHireDateOnChange(el, val);
                }
            },
            'leavegivingyearlyformdata radio[name=leavegroup]': {
                change: function(el, checked) {
                    if (checked) {                      
                        me.setDefaultAmount(el.inputValue);
                        
                        // edit by wulan sari 20190814
                        var f = me.getForm();
                        var disabled = el.inputValue===1? false : true;                        
                        f.down("[name=amount]").setDisabled(disabled);
                        f.down("[name=base_hire_date]").setDisabled(disabled);
                        f.down("[name=expired_date]").setDisabled(disabled);
                        f.down("[name=extension_date]").setDisabled(disabled);
                        f.down("[name=proportional]").setDisabled(disabled);
                        // end edit by wulan sari 20190814

                    }
                }
            }
        };
        return control;
    },
    baseHireDateOnChange: function(el, val) {
        var dateEl = el.up("form").down("[name=hire_date]");
        dateEl.setReadOnly(!val);
        dateEl.setValue("");
    },
    setDefaultAmount:function(leaveGroup){
         var me = this;
         me.getForm().down("[name=amount]").setValue(leaveGroup===1?me.getController().globalParams['P_nleave_quota']:me.getController().globalParams['P_bleave_quota']);         
    },
    fdar: function() {
        var me = this;
        var f = me.getForm();
        me.tools = new Hrd.library.box.tools.Tools();
        me.config = new Hrd.library.box.Config();
        me.setDefaultAmount(me.getForm().down("[name=leavegroup]").getGroupValue());
                
        /* var f = me.getForm();
         var mf = me.getController().getFormdata();
         
         
         var defaultDate = me.getController().getDefaultDate();
         f.down("[name=start_date]").setValue(defaultDate.sd);
         f.down("[name=end_date]").setValue(defaultDate.ed);
         
         me.getController().comboboxLoad(["parametertlk_parametertlk_id"], function() {
         }, me.getForm());
         */
    },
    mainDataSave: function() {
        var me = this;
        
        var leavegroup = me.getForm().down("[name=leavegroup]").getGroupValue();
        if(leavegroup === 1){
            me.insSave({
                form: me.getForm(),
                modeCreate: 'generateyearly',
                mainGrid: me.getController().getGrid(),
                finalData: function(data) {
                    console.log(data);
                    data["test_data"] = 2424;
                    return data;
                },
                success: function() {
                    //me.getController().getGrid().getStore().loadPage(1);
                    
                    me.getController().getGridleave().getStore().load({
                        params: {
                            limit: 9999
                        },
                        callback: function(rec, op) {
                            me.getController().getGridleave().attachModel(op);

                            var rec = me.getController().getGrid().getSelectedRecord();

                            // edit by wulan sari 20190503, kalau kosong maka filter me.doGridLeaveFilter(1), supaya tabel detail tetap kosong
                            rec != undefined ? me.getController().doGridLeaveFilter(rec.get("employee_id")) : me.getController().doGridLeaveFilter(1); 
                        }
                    });
                }
            });
            return;
            
        } else {
            var start_use = me.getForm().down("[name=start_use]").getValue();
            if(parseInt(start_use) === 0 || isNaN(start_use)){
                me.tools.alert.warning('Periode is required');
                return false;
            }
            me.insSave({
                form: me.getForm(),
                modeCreate: 'generatecutibesar',
                mainGrid: me.getController().getGrid(),
                finalData: function(data) {
                    console.log(data);
                    data["test_data"] = 2424;
                    return data;
                },
                success: function() {
                    
                    me.getController().getGridleave().getStore().load({
                        params: {
                            limit: 9999
                        },
                        callback: function(rec, op) {
                            me.getController().getGridleave().attachModel(op);

                            var rec = me.getController().getGrid().getSelectedRecord();

                            // edit by wulan sari 20190503, kalau kosong maka filter me.doGridLeaveFilter(1), supaya tabel detail tetap kosong
                            rec != undefined ? me.getController().doGridLeaveFilter(rec.get("employee_id")) : me.getController().doGridLeaveFilter(1); 
                        }
                    });                   
                    
                }
            });
            return;            
        }        
    }
});