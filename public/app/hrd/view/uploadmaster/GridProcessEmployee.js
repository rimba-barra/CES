Ext.define('Hrd.view.uploadmaster.GridProcessEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.uploadmasterprocessemployeegrid',
    storeConfig: {
        id: 'UploadmasterGridProcessEmployeeStore',
        idProperty: 'employee_id',
        extraParams: {}
    },
    bindPrefixName: 'employee_name',
    newButtonLabel: 'New',
    itemId:'UploadmasterGridProcessEmployeeID',
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width:775,
                height: 500,
                layout: 'fit',
            },
            viewConfig: {
            },
            // selModel: Ext.create('Ext.selection.CheckboxModel', {
            // }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                // {
                //    dataIndex: 'status_transfer',
                //    text: 'Status Transfer',
                //    width:100
                // },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Transfer',
                    dataIndex   : 'upload_check',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },                
                {
                   dataIndex: 'action_process',
                   text: 'Action Transfer',
                   width:100
                },
                {
                   dataIndex: 'status_transfer',
                   text: 'Status Transfer',
                   width:100
                },
                {
                   dataIndex: 'project_name',
                   text: 'Project',
                   width:100
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT',
                   width:100
                },
                {
                   dataIndex: 'nik_group',
                   text: 'NIK Group',
                   width:100
                },
                {
                   dataIndex: 'employee_nik',
                   text: 'NIK Employee',
                   width:100
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Employee Name',
                   width:200
                },
                {
                   dataIndex: 'sex',
                   text: 'Gender',
                   width:50
                },
                {
                   dataIndex: 'religion_name',
                   text: 'Religion',
                   width:100
                },
                {
                   dataIndex: 'birth_date',
                   text: 'Birth Date',
                   width:100,
                   format:'Y-m-d',
                   xtype:'datecolumn'
                },
                {
                   dataIndex: 'birth_place',
                   text: 'Birth Place',
                   width:100
                },
                {
                   dataIndex: 'id_type',
                   text: 'ID Type',
                   width:100
                },
                {
                   dataIndex: 'ktp_number',
                   text: 'ID Number',
                   width:100
                },
                {
                   dataIndex: 'marriagestatus_marriagestatus',
                   text: 'Marital Status',
                   width:100
                },
                {
                   dataIndex: 'nationality',
                   text: 'Nationality',
                   width:100
                },
                {
                   dataIndex: 'npwp',
                   text: 'NPWP',
                   width:100
                },
                {
                   dataIndex: 'npwp_effective_date',
                   text: 'Effective Date NPWP',
                   width:100
                },
                {
                   dataIndex: 'ptkp_code',
                   text: 'PTKP',
                   width:100
                },
                {
                   dataIndex: 'ptkp_effective_date',
                   text: 'Effective Date PTKP',
                   width:100
                },
                {
                   dataIndex: 'department_department',
                   text: 'Organization',
                   width:100
                },
                {
                   dataIndex: 'banding_banding',
                   text: 'Job Title',
                   width:100
                },   
                {
                   dataIndex: 'group_code',
                   text: 'Job Grade',
                   width:100
                },
                {
                   dataIndex: 'position_position',
                   text: 'Job Position',
                   width:100
                },
                {
                   dataIndex: 'hari_kerja_perminggu',
                   text: 'Hari Kerja Perminggu',
                   width:100
                },
                {
                   dataIndex: 'email',
                   text: 'Email',
                   width:100
                },
                {
                   dataIndex: 'email_ciputra',
                   text: 'Email Address',
                   width:100
                },
                {
                   dataIndex: 'phone_number',
                   text: 'Mobile Phone',
                   width:100
                },
                {
                   dataIndex: 'employeestatus_employeestatus',
                   text: 'Employment Status',
                   width:100
                },
                {
                   dataIndex: 'statusinformation_hire_date',
                   text: 'Effective Date',
                   width:100
                   // ,
                   // format:'Y-m-d',
                   // xtype:'datecolumn'
                },
                {
                   dataIndex: 'statusinformation_assignation_date',
                   text: 'Assignation Date',
                   width:100
                   // ,
                   // format:'Y-m-d',
                   // xtype:'datecolumn'
                },
                {
                   dataIndex: 'statusinformation_contract_start',
                   text: 'Contract Start Date',
                   width:100
                   // ,
                   // format:'Y-m-d',
                   // xtype:'datecolumn'
                },
                {
                   dataIndex: 'statusinformation_contract_end',
                   text: 'Contract End Date',
                   width:100
                   // ,
                   // format:'Y-m-d',
                   // xtype:'datecolumn'
                },
                {
                   dataIndex: 'nonactive_date',
                   text: 'Nonactive Date',
                   width:100
                   // ,
                   // format:'Y-m-d',
                   // xtype:'datecolumn'
                },
                {
                   dataIndex: 'payroll_group',
                   text: 'Payroll Group',
                   width:100
                }, 
                {
                   dataIndex: 'ktp_address',
                   text: 'ID Address',
                   width:200
                }, 
                {
                   dataIndex: 'address',
                   text: 'Current Address',
                   width:200
                }, 
                {
                   dataIndex: 'payroll_currency',
                   text: 'Payroll Currency',
                   width:100
                }, 
                {
                   dataIndex: 'payment_method',
                   text: 'Payment Method',
                   width:100
                }, 
                {
                   dataIndex: 'bank_rekening',
                   text: 'Bank',
                   width:100
                }, 
                {
                   dataIndex: 'nomor_rekening',
                   text: 'Bank Account Nr',
                   width:100
                }, 
                {
                   dataIndex: 'nama_rekening',
                   text: 'Bank Account Name',
                   width:100
                }, 
                {
                   dataIndex: 'rekening_effective_date',
                   text: 'Effective Date Bank',
                   width:100
                }, 
                {
                   dataIndex: 'calendar_company',
                   text: 'Calendar',
                   width:100
                }, 
                // {
                //    dataIndex: 'work_shift',
                //    text: 'Workshift',
                //    width:100
                // }, 
                {
                   dataIndex: 'tax_country_code',
                   text: 'Tax Country Code',
                   width:100
                }, 
                {
                   dataIndex: 'fingerprintcode',
                   text: 'Finger Print ID',
                   width:100
                },
                // {
                //    dataIndex: 'cost_center_code',
                //    text: 'Cost Center Code',
                //    width:100
                // },
                {
                   dataIndex: 'no_bpjs_kk',
                   text: 'No BPJS Ketenagakerjaan',
                   width:100
                },   
                {
                   dataIndex: 'no_bpjs_k',
                   text: 'No BPJS Kesehatan',
                   width:100
                },  
                {
                   dataIndex: 'no_bpjs_pp',
                   text: 'No BPJS Jaminan Pensiun',
                   width:100
                },
                {
                   dataIndex: 'no_manulife_p',
                   text: 'No Manulife',
                   width:100
                },  
                {
                   dataIndex: 'no_asuransi',
                   text: 'No Asuransi',
                   width:100
                },  
                // {
                //    dataIndex: 'jobfamily_jobfamily',
                //    text: 'Job Family',
                //    width:100
                // },  
                // {
                //    dataIndex: 'statusinformation_assignation_date',
                //    text: 'Assignation Date',
                //    width:100,
                //    format:'Y-m-d',
                //    xtype:'datecolumn'
                // },
                // {
                //    dataIndex: 'statusinformation_contract_start',
                //    text: 'Contract Start',
                //    width:100,
                //    format:'Y-m-d',
                //    xtype:'datecolumn'
                // }, 
                {
                   dataIndex: 'worklocation',
                   text: 'Worklocation',
                   width:100
                },
                {
                   dataIndex: 'worklocation_project',
                   text: 'Worklocation(Project)',
                   width:200
                },  
                {
                   dataIndex: 'worklocation_pt',
                   text: 'Worklocation(Pt)',
                   width:200
                }, 
                {
                   dataIndex: 'ibu_kandung',
                   text: 'Nama Ibu Kandung',
                   width:100
                },                    
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         {
            //             xtype: 'button',
            //             action: 'choose_formcompetency',
            //             iconCls: 'icon-new',
            //             text: 'Choose Competency'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'delete_formcompetency',
            //             iconCls: 'icon-delete',
            //             text: 'Delete Competency'
            //         }
            //     ]
            // },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
   
});