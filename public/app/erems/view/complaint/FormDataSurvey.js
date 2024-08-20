Ext.define('Erems.view.complaint.FormDataSurvey', {
    extend      : 'Erems.library.template.view.FormData',
    alias       : 'widget.complaintformdatasurvey',
    requires    :['Erems.view.complaint.DetailGridSurvey'],
    frame       : true,
    autoScroll  : true,
    anchorSize  : 100,
    height      : 450,
    bodyBorder  : true,
    bodyPadding : 10,
    bodyStyle   : 'padding:5px 5px 0',
    defaults    : {
        border : false,
        xtype  : 'panel',
        flex   : 1,
        layout : ''
    },
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults : {
                labelAlign     : 'top',
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            items: [
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_aftersales_id',
                    name   : 'aftersales_id'
                },
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_unit_id',
                    name   : 'unit_id'
                },
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_survey_aftersales_id',
                    name   : 'survey_aftersales_id'
                },
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_purchaseletter_id',
                    name   : 'purchaseletter_id'
                },
                {
                    xtype          : 'datefield',
                    itemId         : 'fdms_periode',
                    name           : 'periode',
                    fieldLabel     : 'Periode',
                    anchor         : '-5',
                    labelSeparator : '',
                    format         : 'm Y',
                    altFormats     : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat   : 'Y-m-d H:i:s.u',
                    value          : new Date()
                },
                {
                    xtype      : 'numberfield',
                    itemId     : 'fdms_nilai_survey',
                    name       : 'nilai_survey',
                    fieldLabel : 'Nilai Survey',
                    allowBlank : false,
                    anchor     : '-5'
                },
                {
                    xtype      : 'numberfield',
                    itemId     : 'fdms_nilai_survey_nps',
                    name       : 'nilai_survey_nps',
                    fieldLabel : 'Nilai NPS',
                    allowBlank : false,
                    anchor     : '-5'
                },
                {
                    xtype     : 'panel',
                    width     : '100%',
                    flex      : 3,
                    bodyStyle : 'border:0px',
                    items     : [
                        {
                            layout    : 'hbox',
                            bodyStyle : 'border:0px',
                            items     : [
                                {
                                    xtype  : 'complaintdetailgridsurvey',
                                    width  : '100%',
                                    itemId : 'complaintdetailgridsurvey'
                            }   ]
                        }
                        
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

    generateDockedItem: function () {
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
                        action  : 'save',
                        itemId  : 'btnSave',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-save',
                        text    : 'Save'
                    },
                    {
                        xtype   : 'button',
                        action  : 'reset',
                        itemId  : 'btnReset',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-reset',
                        text    : 'Reset'
                    },
                    {
                        xtype   : 'button',
                        action  : 'cancel',
                        itemId  : 'btnCancel',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-cancel',
                        text    : 'Close',
                        handler : function () {
                            this.up('window').close();
                        }
                    },
                ]
            }
        ];
        return x;
    }
});