Ext.define('Hrd.controller.Holiday', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Holiday',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector', 'Hrd.library.Box.Tools.Browse'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'holiday',
    formWidth: 950,
    refs: [
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    fieldName: 'calendar_id',
    bindPrefixName: 'Holiday',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        shiftType: null,
        listMonth: null,
        detail: null,
        selectedCalendar: null
    },
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        //Ext.tip.QuickTipManager.init();
    },
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs = {};
        newEvs['holidayformdata button[action=process]'] = {
            click: me.generateCalender
        };
        newEvs['holidayformdata combobox[name=year]'] = {
            change: me.yearOnChange
        };
        newEvs['holidayformdata button[action=lookup]'] = {
            click: me.browseCalendar
        };
        newEvs['holidaycalendargrid button[action=select]'] = {
            click: me.selectCalendar
        };
        /*
         'changepriceunitgrid button[action=select]': {
         click: this.unitSelect
         },
         */

        this.control(newEvs);

    },
    selectCalendar: function() {
        var me = this;
        var f = me.getFormdata();
        if (me.browseHandler) {
            me.browseHandler.selectItem(function() {
                // var unitId = f.down("[name=unit_unit_id]").getValue();
                var ps = me.localStore.selectedCalendar; // purchaseletter detail Store
                var psRec = ps.getAt(0);
                console.log(ps);
                if (psRec) {
                    ps.each(function(rec) {

                        if (rec != null) {
                            console.log(rec);
                            var el = f.down("#c_" + me._MONTHLIST[rec.data.month]["name"] + "_" + rec.data.day);
                            if (el) {
                             
                                el.down("combobox").setValue(rec.data.shifttype_shifttype_id);
                                el.down("hiddenfield").setValue(rec.data.calendardetail_id);
                                el.down("checkbox").setValue(rec.data.is_holiday);
                                el.down("checkbox").on('click', function(id) {
                                    var MyComp = Ext.getCmp(this.id);
                                    console.log('click' + MyComp.checked);

                                });
                                
                               
                              //  me.addElements(el,rec);
                                

                            }
                        }

                    });
                } else {
                    console.log("Calend doesn't exist");
                }


            });
        }
    },
    addElements: function(el,rec) {
        el.down("combobox").setValue(rec.data.shifttype_shifttype_id);
        el.down("hiddenfield").setValue(rec.data.calendardetail_id);
        el.down("checkbox").setValue(rec.data.is_holiday);
        el.down("checkbox").on('click', function(id) {
            var MyComp = Ext.getCmp(this.id);
            console.log('click' + MyComp.checked);

        });
    },
    browseCalendar: function(el) {
        var me = this;
        var browse = new Hrd.library.Box.Tools.Browse();
        browse.init({
            controller: me,
            view: 'CalendarGrid',
            el: el,
            localStore: "selectedCalendar",
            mode_read: "detail"
        });
        browse.showWindow();
    },
    yearOnChange: function() {
        var me = this;
        me.getFormdata().down("button[action=save]").setDisabled(true);
    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;

        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            //  store: me.localStore["detail"].store,
            //store:me.getGrid().getStore(),
            finalData: function(data) {

                var listMonth = me.monthPanel().getMonthList(me.localStore.listMonth);
                var detail = [];
                var count = 1;
                for (var x in listMonth) {
                    for (var y = 1; y < 32; y++) {
                        var el = f.down("#c_" + listMonth[x]["name"] + "_" + y);

                        if (el) {
                            var shiftTypeId = el.down("combobox").getValue();
                            shiftTypeId = shiftTypeId === null ? 0 : shiftTypeId;
                            detail.push({
                                'calendardetail_id': el.down("hiddenfield").getValue(),
                                'day': y,
                                'month': count,
                                'shifttype_shifttype_id': shiftTypeId,
                                'is_holiday': el.down("checkbox").getValue()
                            });
                        }
                    }
                    count++;

                }
                // data["unit_unit_id"] = data["unit_id"];
                data["detail"] = detail;

                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    createCalendar: function(year, callback) {
        var me = this;
        var f = me.getFormdata();

        f.down("button[action=lookup]").setDisabled(false);

        me.localStore.listMonth = me.instantStore({
            id: me.controllerName + 'ListMonthStore',
            extraParams: {
                mode_read: 'listmonth'
            },
            idProperty: 'month_id'
        });
        f.setLoading("Loading month list...");
        me.tools.ajax({
            params: {
                year: year
            },
            success: function(data, model) {
                var f = me.getFormdata();
                // me.attachModel(data.month, me.localStore.listMonth, true);
                me.tools.wesea(data.month, me.localStore.listMonth).instantStore(true);

                if (me.localStore.listMonth.getCount() === 0) {
                    console.log("Error Create Calender: No data for list month");
                } else {
                    var el = f.down("#monthTabPanelID");
                    el.removeAll();
                    console.log(me.monthPanel(me.localStore.listMonth).getMonthTab());
                    el.add(me.monthPanel(me.localStore.listMonth).getMonthTab());
                    el.setActiveTab(0);
                    me.monthPanel().mappingShiftType(me.localStore.listMonth);
                    f.setLoading(false);
                    if (typeof callback === "function") {
                        callback();
                    }
                }

                f.setLoading(false);
            }
        }).read('listmonth');
    },
    /*
     createCalendar: function(year, callback) {
     var me = this;
     var f = me.getFormdata();
     f.setLoading("Generating New Sheet..");
     
     me.localStore.listMonth = me.instantStore({
     id: me.controllerName + 'ListMonthStore',
     extraParams: {
     mode_read: 'listmonth'
     },
     idProperty: 'month_id'
     });
     me.localStore.listMonth.load({
     params: {
     year: year
     },
     callback: function(rec, op) {
     var f = me.getFormdata();
     me.attachModel(op, me.localStore.listMonth, true);
     if (me.localStore.listMonth.getCount() === 0) {
     console.log("Error Create Calender: No data for list month");
     } else {
     var el = f.down("#monthTabPanelID");
     el.removeAll();
     console.log(me.monthPanel(me.localStore.listMonth).getMonthTab());
     el.add(me.monthPanel(me.localStore.listMonth).getMonthTab());
     el.setActiveTab(0);
     me.monthPanel().mappingShiftType(me.localStore.listMonth);
     f.setLoading(false);
     if (typeof callback === "function") {
     callback();
     }
     }
     
     
     }
     });
     }, 
     */

    generateCalender: function() {
        var me = this;
        var f = me.getFormdata();
        var year = 0;
        year = f.down("[name=year]").getValue();
        if (!year) {
            Ext.Msg.alert('Error', 'Please select year first.');
            return;
        }

        me.createCalendar(year, function() {
            // automate fill data

            var vs = f.getValues();
            me.automateFillShiftType();
            f.down("button[action=save]").setDisabled(false);
        });

    },
    automateFillShiftType: function() {
        var me = this;
        var f = me.getFormdata();
        var listMonth = me.monthPanel().getMonthList(me.localStore.listMonth);
        var detail = [];
        var count = 1;
        for (var x in listMonth) {
            //'d_' + month + '_' + days[x]
            var isOffDay = false;
            for (var y = 1; y < 32; y++) {
                var el = f.down("#c_" + listMonth[x]["name"] + "_" + y);

                if (el) {
                    isOffDay = (el.up('fieldset').title === "sunday" || el.up('fieldset').title === "saturday") ? true : false;
                   // el.down("combobox").setValue(isOffDay ? 5 : 1005);
                }
            }
            count++;

        }
    },
    fdar: function() {
        var me = this;
        ////


        ///


        var f = me.getFormdata();

        var g = me.getGrid();
        me.setActiveForm(f);


        f.setLoading(false);

        var x = {
            init: function() {

                //  var f = me.getFormdata();


            },
            create: function() {
                f.down("button[action=save]").setDisabled(true);
                me.comboboxLoad(["department_department_id"]);
                me.unMask(1);
            },
            update: function() {

                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (rec) {
                    f.editedRow = g.getSelectedRow();
                    f.down("[name=department_department_id]").setReadOnly(true);
                    f.down("[name=year]").setReadOnly(true);
                    me.comboboxLoad(["department_department_id"], function() {
                        f.loadRecord(rec);
                    });
                    var year = rec.get("year");

                    me.createCalendar(year, function() {
                        /// load calendar detail

                        me.localStore.detail = me.instantStore({
                            id: me.controllerName + 'DetailStore',
                            extraParams: {
                                mode_read: 'detail'
                            },
                            idProperty: 'calendardetail_id'
                        });

                        var s = me.localStore.detail;

                        s.load({
                            params: {
                                calendar_id: rec.get("calendar_id")
                            },
                            callback: function(rec, op) {
                                var f = me.getFormdata();
                                me.attachModel(op, s, true);

                                s.each(function(rec) {

                                    if (rec != null) {

                                        var el = f.down("#c_" + me._MONTHLIST[rec.data.month]["name"] + "_" + rec.data.day);
                                        if (el) {
                                            
                                            el.down("combobox").setValue(rec.data.shifttype_shifttype_id);
                                            el.down("hiddenfield").setValue(rec.data.calendardetail_id);
                                            el.down("checkbox").setValue(rec.data.is_holiday);
                                            
                                           
                                           // me.addElements(el,rec);
                                        }
                                    }

                                });
                                me.unMask(1);
                                me.getFormdata().down("button[action=save]").setDisabled(false);

                            }
                        });

                    });
                }


            }
        };
        return x;
    },
    _MONTHLIST: {
        1: {
            name: "January"
        },
        2: {
            name: "February"
        },
        3: {
            name: "March"
        },
        4: {
            name: "April"
        },
        5: {
            name: "May"
        },
        6: {
            name: "June"
        },
        7: {
            name: "July"
        },
        8: {
            name: "August"
        },
        9: {
            name: "September"
        },
        10: {
            name: "October"
        },
        11: {
            name: "November"
        },
        12: {
            name: "December"
        }
    },
    monthPanel: function(store) {
        console.log(store);
        var me = this;
        var x = {
            getMonthList: function(myStore) {
                var monthList = [];
                if (myStore) {
                    if (myStore.data.items.length === 0) {
                        console.log("Error Month panel [getMonthList]: No data");
                    } else {
                        myStore.each(function(rec) {

                            if (rec != null) {
                                monthList.push(rec.data);
                            }

                        });
                    }

                } else {
                    console.log("Error Month panel : No data store");
                }
                return monthList;
            },
            mappingShiftType: function(myStore) {
                me.localStore.shiftType = me.instantStore({
                    id: me.controllerName + 'ShiftTypeStore',
                    extraParams: {
                        mode_read: 'master_shifttype'
                    },
                    idProperty: 'shifttype_id'
                });
                me.localStore.shiftType.load({
                    params: {
                        unit_id: 0
                    },
                    callback: function(rec, op) {
                        var f = me.getFormdata();
                        me.attachModel(op, me.localStore.shiftType, true);
                        var rec = me.localStore.shiftType.getAt(0);
                        myStore.each(function(rec) {

                            if (rec != null) {
                                for (var i = 1; i <= 31; i++) {
                                    var el = f.down("[name=" + i + "_" + rec.data.name + "]");
                                    if (el) {
                                        el.bindStore(me.localStore.shiftType);

                                    }

                                }
                            }

                        });

                        //  f.down("[name=pricetype_id]").setDisabled(false);
                    }
                });
            },
            getFirstDate: function(ar, day) {
                var found = 0;
                for (var x in ar) {
                    if (ar[x] === day) {
                        found = x;
                    }
                }
                found = (7 - found) + 1;
                return found;

            },
            generateWeek: function(startDate, maxDay, checked, month) {
                var fieldComps = [];
                var date = startDate - 7;
                var blankRow = false;

                var blankElement = {
                    items: [
                        {
                            xtype: 'label',
                            text: '',
                            margin: '14 0'
                        },
                    ]
                };

                if (date > 0) {

                } else {
                    date = startDate;
                    fieldComps.push(blankElement);
                    blankRow = true;
                }


                for (var i = 0; i <= 5; i++) {
                    if (date <= maxDay) {
                        fieldComps.push({
                            itemId: 'c_' + month + '_' + date,
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'calendardetail_id_' + date + '_' + month
                                },
                                {
                                    xtype: 'checkbox',
                                    width: 40,
                                    boxLabel: date,
                                    checked: checked
                                },
                                {
                                    xtype: 'combobox',
                                    name: date + '_' + month,
                                    displayField: 'code',
                                    valueField: 'shifttype_id',
                                    width: 60,
                                }
                            ]
                        });
                    } else {
                        if (i < 5) {
                            fieldComps.push(blankElement);
                        } else {
                            if (!blankRow) {
                                fieldComps.push(blankElement);
                            }
                        }

                    }

                    date += 7;
                }
                return fieldComps;
            },
            generateMonth: function(firstDay, maxDay, month) {
                var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                var fieldsetDays = [];

                var firstDate = me.monthPanel().getFirstDate(days, firstDay);


                var checked = false;

                for (var x in days) {
                    checked = days[x] === 'sunday' || days[x] === 'saturday' ? false : false;
                    // checked = days[x] === 'sunday' || days[x] === 'saturday' ? true : false;
                    fieldsetDays.push({
                        itemId: 'd_' + month + '_' + days[x],
                        title: days[x],
                        layout: 'vbox',
                        defaults: {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 0 5 0',
                            }
                        },
                        items: me.monthPanel().generateWeek(firstDate, maxDay, checked, month)
                    });
                    firstDate++;
                }

                return fieldsetDays;
            },
            getMonthTab: function() {
                var monthElements = [];
                if (store.getCount() === 0) {
                    console.log("Error getMonthTab : No items");
                }
                var monthList = this.getMonthList(store);
                console.log("MONTH LIST");
                console.log(monthList);
                if (monthList.length === 0) {
                    me.tools.alert.error("Fail to generate month list");
                }
                for (var x in monthList) {
                    monthElements.push({
                        title: monthList[x]['name'],
                        bodyPadding: 5,
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                defaults: {
                                    xtype: 'fieldset'
                                },
                                items: me.monthPanel().generateMonth(monthList[x]['startday'], monthList[x]['maxday'], monthList[x]['name'])
                            }]
                    });
                }
                return monthElements;
            }
        }


        return x;
    }






});