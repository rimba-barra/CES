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
                me.getController().getGrid().getStore().loadPage(1);
            }
        });
        return;
    }
});