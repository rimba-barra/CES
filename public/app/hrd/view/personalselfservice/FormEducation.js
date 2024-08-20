Ext.define('Hrd.view.personalselfservice.FormEducation', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformeducation',
    requires: [
        'Hrd.view.personalselfservice.GridEducationFormal',
        'Hrd.view.personalselfservice.GridEducationNonFormal',
    ],
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformeducation',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    autoScroll: true,
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            title: 'Formal',
                            xtype: 'familyeducationformalgrid',
                            name: 'educationformal',
                            id: 'educationformal',
                            readOnly: false,
                            width: 900,
                            height: 230,
                        },
                        {
                            title: 'Non Formal',
                            xtype: 'familyeducationnonformalgrid',
                            name: 'educationnonformal',
                            id: 'educationnonformal',
                            readOnly: false,
                            width: 900,
                            height: 230,
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});

