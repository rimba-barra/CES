Ext.define('Erems.view.informasitagihan.FormDataGeneratedate', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.informasitagihanformdatageneratedate',
    itemId        : 'informasitagihanformdatageneratedate',
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    bodyBorder    : true,
    bodyPadding   : 10,
    maxWidth      : 600,
    minWidth      : 600,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me = this;

        var store_periode = Ext.create('Ext.data.Store', {
            fields : ['periode_id', 'periode_name'],
            data   : [
                { "periode_id" : "1", "periode_name" : "Pertama" },
                { "periode_id" : "2", "periode_name" : "Kedua" },
            ]
        });

        // var dateFormat_bulan_tahun = Ext.define('Ext.form.field.Month', {
        //     extend             : 'Ext.form.field.Date',
        //     alias              : 'widget.monthfield',
        //     requires           : ['Ext.picker.Month'],
        //     alternateClassName : ['Ext.form.MonthField', 'Ext.form.Month'],
        //     selectMonth        : null,
        //     createPicker       : function() {
        //         var me = this,
        //             format = Ext.String.format;

        //         // console.log(me.maxValue)

        //         return Ext.create('Ext.picker.Month', {
        //             pickerField       : me,
        //             ownerCt           : me.ownerCt,
        //             renderTo          : document.body,
        //             floating          : true,
        //             hidden            : true,
        //             focusOnShow       : true,
        //             minDate           : me.minValue,
        //             maxDate           : me.maxValue,
        //             disabledDatesRE   : me.disabledDatesRE,
        //             disabledDatesText : me.disabledDatesText,
        //             disabledDays      : me.disabledDays,
        //             disabledDaysText  : me.disabledDaysText,
        //             format            : me.format,
        //             showToday         : me.showToday,
        //             startDay          : me.startDay,
        //             minText           : format(me.minText, me.formatDate(me.minValue)),
        //             maxText           : format(me.maxText, me.formatDate(me.maxValue)),
        //             listeners         : {
        //                 select : {
        //                     scope : me,
        //                     fn    : me.onSelect
        //                 },
        //                 monthdblclick : {
        //                     scope : me,
        //                     fn    : me.onOKClick
        //                 },
        //                 yeardblclick : {
        //                     scope : me,
        //                     fn    : me.onOKClick
        //                 },
        //                 OkClick : {
        //                     scope : me,
        //                     fn    : me.onOKClick
        //                 },
        //                 CancelClick : {
        //                     scope : me,
        //                     fn    : me.onCancelClick
        //                 }
        //             },
        //             keyNavConfig: {
        //                 esc: function() {
        //                     me.collapse();
        //                 }
        //             }
        //         });
        //     },
        //     onCancelClick: function() {
        //         var me = this;
        //         me.selectMonth = null;
        //         me.collapse();
        //     },
        //     onOKClick: function() {
        //         var me = this;
        //         if (me.selectMonth) {
        //             me.setValue(me.selectMonth);
        //             me.fireEvent('select', me, me.selectMonth);
        //         }
        //         me.collapse();
        //     },
        //     onSelect: function(m, d) {
        //         var me = this;
        //         me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
        //     }
        // });

        // var dateFormat_bulan_tahun = Ext.create('Ext.form.field.Month', {
        //     fieldLabel   : 'Tanggal ',
        //     name         : 'tanggal',
        //     renderTo     : Ext.getBody(),
        //     value        : new Date(),
        //     maxValue     : new Date(),
        //     editable     : false,
        //     allowBlank   : false,
        //     format       : 'F Y',
        //     altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
        //     submitFormat : 'Y-m-d H:i:s.u',
        //     labelWidth   : 70,
        //     width        : 200,
        // });

        var date_now = new Date();
        var year     = date_now.getFullYear();
        var month    = date_now.getMonth() + 1;
        var day      = date_now.getDate();

        var months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Ext.applyIf(me, {
            defaults: {
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            xtype: 'container',
            layout   : 'hbox',
            margin   : '10px 0 0 0',
            defaults : {
                xtype  : 'container',
                layout : 'hbox',
                flex   : 1,
                width  : '100%'
            },
            items     : [
                {
                    items: [
                        {
                            xtype : 'label',
                            text  : 'Periode Pertama',
                            width : 100
                        },
                        {
                            xtype : 'label',
                            text  : ': Akan Proses Tagihan Tanggal 1 - 15, pada bulan berikutnya',
                            width : 500
                        },
                    ]
                },
                {
                    defaults : {
                        padding : '0 0 15px 0',
                    },
                    items: [
                        {
                            xtype : 'label',
                            text  : 'Periode Kedua',
                            width : 100
                        },
                        {
                            xtype : 'label',
                            text  : ': Akan Proses Tagihan Tanggal 16 s/d akhir bulan, pada bulan berikutnya',
                            width : 500
                        },
                    ]
                },
                {
                    items: [
                        { xtype: 'splitter', width: 50 },
                        {
                            // xtype : me.fieldMonthYear({
                            //     fieldLabel   : 'Tanggal ',
                            //     name         : 'tanggal',
                            //     value        : new Date(),
                            //     maxValue     : new Date(),
                            //     editable     : false,
                            //     allowBlank   : false,
                            //     labelWidth   : 70,
                            //     width        : 200,
                            // }),
                            
                            xtype        : 'datefield',
                            fieldLabel   : 'Tanggal ',
                            anchor       : '-5',
                            name         : 'tanggal',
                            editable     : false,
                            allowBlank   : false,
                            hidden       : true,
                            value        : date_now,
                            maxValue     : new Date(year, month, 0),
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            labelWidth   : 70,
                            width        : 200,

                        },
                        {
                            xtype      : 'textfield', 
                            fieldLabel : 'Tanggal ',
                            anchor     : '-5',
                            name       : 'tanggal_proses', 
                            editable   : false,
                            allowBlank : false,
                            value      : months[month-1] + ' ' + year,
                            labelWidth : 70,
                            width      : 200,
                        },
                    ]
                },
                {
                    items: [
                        { xtype: 'splitter', width: 50 },
                        {
                            xtype        : 'combobox',
                            fieldLabel   : 'Periode ',
                            anchor       : '-5',
                            name         : 'periode',
                            queryMode    : 'local',
                            store        : store_periode,
                            displayField : 'periode_name',
                            valueField   : 'periode_id',
                            value        : '1',
                            renderTo     : Ext.getBody(),
                            editable     : false,
                            allowBlank   : false,
                            labelWidth   : 70,
                            width        : 200,
                        },
                    ]
                },
                {
                    defaults : {
                        padding : '15px 0 0 0',
                    },
                    items : [
                        {
                            xtype : 'label',
                            text  : 'Proses Data Tanggal',
                            width : 120
                        },
                        {
                            xtype : 'label',
                            name  : 'text_periode',
                            text  : '',
                            width : 500
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    padding : 6,
                    type    : 'hbox'
                },
                items: [
                    {
                        xtype   : 'button',
                        action  : 'proses_generate_date',
                        itemId  : 'proses_generate_date',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-save',
                        text    : 'Process'
                    },
                    {
                        xtype   : 'button',
                        action  : 'cancel',
                        itemId  : 'btnCancel',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-cancel',
                        text    : 'Cancel',
                        handler : function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

