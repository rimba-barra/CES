<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
date_default_timezone_set('Asia/Jakarta');

class Gl_Models_Prosesakhirtahun extends Zend_Db_Table_Abstract {

    protected $folderdata = '';
    protected $backupfolder = '';
    protected $destination = '';

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        //lokasi file akan berada di public dan dengan nama folder database
        $this->folderdb = getcwd() . '/database/';
        $this->folderdata = getcwd() . '/database/temporary/';
        $this->destination = getcwd() . '/database/generate/';
        $this->backupfolder = getcwd() . '/database/backup/';
    }

    function dataCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
               

                $setup = new Gl_Models_General_Setdata();
                $counter = 0;
                $result = array("yeardb"=>2017); 

                if($param['hideparam'] !=='defaultrange'){
                    $this->_schema = 'cashier.dbo';
                    $result = $this->execSP2('sp_prosesakhirtahun_create', $setup->_project_id,$setup->_pt_id,$param['tahun']);
                }

                

                if ($param['hideparam'] == 'default') {
                    $count = $counter;
                    $msg = ' Process finish';
                } else {
                    $count = $counter;
                    $msg = '';
                }

                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function dataCreateOld($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                switch ($param['hideparam']) {
                    case 'defaultrange':
                        $counter = 0;
                        $result = $this->_helperdata->rangeActiveYear();
                        break;
                    default:
                        $this->backupdatabase($param['tahun']);
                        $result = null;
                        $counter = 1;
                        break;
                }

                if ($param['hideparam'] == 'default') {
                    $count = $counter;
                    $msg = ' Process finish';
                } else {
                    $count = $counter;
                    $msg = '';
                }

                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function recursiveRemoveDirectory($directory) {
        foreach (glob("{$directory}/*") as $file) {
            if (is_dir($file)) {
                $this->recursiveRemoveDirectory($file);
            } else {
                unlink($file);
            }
        }
        rmdir($directory);
    }

    function createfolder_database() {
        if (!file_exists($this->folderdb)) {
            mkdir($this->folderdb, 0777, true);
        }
    }

    function createfolder_backup() {
        if (!file_exists($this->backupfolder)) {
            mkdir($this->backupfolder, 0777, true);
        }
    }

    function createfolder_generate() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }

    function createfolder_temporary() {
        if (!file_exists($this->folderdata)) {
            mkdir($this->folderdata, 0777, true);
        } else {
            $this->recursiveRemoveDirectory($this->folderdata);
            mkdir($this->folderdata, 0777, true);
        }
    }

    function backupdatabase() {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $yearactivedb = $tmp[1];
        $newyeardb = $yearactivedb + 1;
        $backupdb = $tmp[0] . "_" . $yearactivedb;
        $backupdbbak = $tmp[0] . "_" . $yearactivedb . '.bak';
        $newdb = $tmp[0] . "_" . $newyeardb;
        $newmdf = $this->destination . $newdb . '.mdf';
        $newldf = $this->destination . $newdb . '.ldf';
        $filebak = $this->backupfolder . $backupdbbak;
        $resultcheck = $this->_model->checkregisterdatabase($tmp[0], $newdb, $newyeardb);
        $check = $resultcheck[0][0]['counterdata'];
        $this->createfolder_database();
        $this->createfolder_backup();
        $this->createfolder_temporary();
        $this->createfolder_generate();
        if ($check < 1) {
            $this->_model->registerdatabase($tmp[0], $newdb, $newyeardb);
            $this->_model->createdatabase($backupdb, $filebak, $newdb, $newmdf, $newldf);
        }
        $this->create_mj($yearactivedb, $newyeardb);
    }

    public function create_mj($old_db, $new_db) {
        $setup = new Gl_Models_General_Setdata();
        $trialbalance = new Gl_Models_Trialbalance();
        $yeardata = $old_db;
        $newyear = $new_db;
        $fromdateprocess = $old_db . '-12-01';
        $untildateprocess = $old_db . '-12-31';
        $old_db = 'gl_' . $old_db . '.dbo.';
        $new_db = 'gl_' . $new_db . '.dbo.';
        $m_coa_old = $old_db . $setup->_m_coa;
        $m_coa_new = $new_db . $setup->_m_coa;
        $m_kelasub_old = $old_db . $setup->_m_kelsub;
        $m_kelasub_new = $new_db . $setup->_m_kelsub;
        $th_jurnal_old = $old_db . $setup->_th_jurnal;
        $th_jurnal_new = $new_db . $setup->_th_jurnal;
        $td_jurnaldetail_old = $old_db . $setup->_td_jurnaldetail;
        $td_jurnaldetail_new = $new_db . $setup->_td_jurnaldetail;
        $td_jurnalsubdetail_old = $old_db . $setup->_td_jurnalsubdetail;
        $td_jurnalsubdetail_new = $new_db . $setup->_td_jurnalsubdetail;


        $datavoucher = $setup->getdata_voucher($th_jurnal_new, 'MJ0001/01');
        if (!empty($datavoucher)) {
            //delete mj0001/01 jika datanya sudah ada
            $journal_id = $datavoucher['journal_id'];
            $setup->updatedatav3($td_jurnalsubdetail_new, array("deleted" => 1, "active" => 0), array('journal_id' => $journal_id));
            $setup->updatedatav3($td_jurnaldetail_new, array("deleted" => 1, "active" => 0), array('journal_id' => $journal_id));
            $setup->updatedatav3($th_jurnal_new, array("deleted" => 1, "active" => 0), array('journal_id' => $journal_id));
        } else {
            $datacoa_first = $setup->getcoa_neraca_sort($m_coa_old, 'ASC');
            $datacoa_last = $setup->getcoa_neraca_sort($m_coa_old, 'DESC');
            if (!empty($datacoa_first) || !empty($datacoa_last)) {
                $paramtrialbalance = array(
                    "yeardata" => $yeardata,
                    "headertype" => 2,
                    "headerdesc" => "Without Header",
                    "detailtype" => 1,
                    "detaildesc" => "With Detail",
                    "fromcoa" => $datacoa_first['coa'],
                    "untilcoa" => $datacoa_last['coa'],
                    "fromdate" => $fromdateprocess,
                    "untildate" => $untildateprocess,
                    "hideparam" => "generatereport",
                );
                $trialbalance->generateDatabyparam($paramtrialbalance);
                $querytb = "SELECT * FROM ##tmp_rpt_" . $setup->_user_id;
                $querytb .= " WHERE project_id=$setup->_project_id AND pt_id=$setup->_pt_id AND level=2";
                $querytb .= " ORDER BY coa";

                $vouchermj = $this->createVoucher($new_db, $newyear);
                if ($vouchermj) {
                    $voucher_mj_id = $vouchermj['journal_id'];
                    $datacoamj = $setup->customefromquery($querytb);
                    if ($datacoamj) {
                        if (!empty($datacoamj[0])) {
                            $sortdetail = 0;

                            foreach ($datacoamj[0] as $rowcoamj) {
                                $sortdetail++;



                                $coa_id = 0;
                                $coa = NULL;
                                $kelsub_id = 0;
                                $kelsub = NULL;

                                if ($rowcoamj['coa_id'] > 0) {
                                    $datacoa = $setup->getdata_coabycode($m_coa_old, $rowcoamj['coa']);
                                    $coa_id = $datacoa['coa_id'];
                                    $coa = $datacoa['coa'];
                                    $kelsub_id = $datacoa['kelsub_id'];
                                }

                                if ($kelsub_id > 0) {
                                    $datakelsub = $setup->getbyid_kelsub($m_kelasub_old, $kelsub_id);
                                    $kelsub_id = $datakelsub['kelsub_id'];
                                    $kelsub = $datakelsub['kelsub'];
                                }

                                if ($rowcoamj['ending_amount'] < 0) {
                                    $flow = 'C';
                                    $amount = abs($rowcoamj['ending_amount']);
                                } else {
                                    $flow = 'D';
                                    $amount = $rowcoamj['ending_amount'];
                                }

                                $recorddetail = array(
                                    "project_id" => $setup->_project_id,
                                    "pt_id" => $setup->_pt_id,
                                    "journal_id" => $voucher_mj_id,
                                    "sort" => $sortdetail,
                                    "coa_id" => $coa_id,
                                    "coa" => $coa,
                                    "kelsub_id" => $kelsub_id,
                                    "kelsub" => $kelsub,
                                    "type" => $flow,
                                    "keterangan" => " ENDING BALANCE " . $yeardata,
                                    "amount" => floatval($amount),
                                    "addon" => date('Y-m-d H:i:s'),
                                    "addby" => $setup->_user_id,
                                );
                                $setup->insertdata_v4($td_jurnaldetail_new, $recorddetail);
                            }
                            $sumdebit = $setup->getsum_detail($td_jurnaldetail_new, $voucher_mj_id, "D");
                            $sumcredit = $setup->getsum_detail($td_jurnaldetail_new, $voucher_mj_id, "C");
                            if (isset($sumdebit['totalamount'])) {
                                $debit = $sumdebit['totalamount'];
                                $credit = $sumcredit['totalamount'];
                                $net = $debit - $credit;

                                $recordsumvoucher = array(
                                    "debit_total" => $debit,
                                    "credit_total" => $credit,
                                    "selisih" => $net,
                                );

                                $setup->updatedatav3($th_jurnal_new, $recordsumvoucher, array('journal_id' => $voucher_mj_id));
                            }
                            $this->createdatasubdetail($old_db, $new_db, $yeardata, $newyear, $voucher_mj_id);
                        }
                    }
                }
            }
        }
    }

    public function createdatasubdetail($old_db, $new_db, $old_year, $newyear, $vouchermj_id) {
        $setup = new Gl_Models_General_Setdata();
        $m_coa_old = $old_db . $setup->_m_coa;
        $m_coa_new = $new_db . $setup->_m_coa;
        $m_kelasub_old = $old_db . $setup->_m_kelsub;
        $m_kelasub_new = $new_db . $setup->_m_kelsub;
        $m_subgl_old = $old_db . $setup->_m_subgl;
        $m_subgl_new = $new_db . $setup->_m_subgl;
        $th_jurnal_old = $old_db . $setup->_th_jurnal;
        $th_jurnal_new = $new_db . $setup->_th_jurnal;
        $td_jurnaldetail_old = $old_db . $setup->_td_jurnaldetail;
        $td_jurnaldetail_new = $new_db . $setup->_td_jurnaldetail;
        $td_jurnalsubdetail_old = $old_db . $setup->_td_jurnalsubdetail;
        $td_jurnalsubdetail_new = $new_db . $setup->_td_jurnalsubdetail;

        $datajournaldetail = $setup->getcoawithkelsub_injournaldetail($td_jurnaldetail_new, $vouchermj_id);
        if ($datajournaldetail) {
            foreach ($datajournaldetail as $rowdetail) {
                $journal_id = $rowdetail['journal_id'];
                $journaldetail_id = $rowdetail['journaldetail_id'];
                $sortdetail = $rowdetail['sort'];
                $coa_id = $rowdetail['coa_id'];
                $coa = $rowdetail['coa'];
                $kelsub_id = $rowdetail['kelsub_id'];

                //print_r($rowdetail);

                $datasubdetailformoldjournal = $setup->getdatasubon_oldjournal($th_jurnal_old, $td_jurnaldetail_old, $td_jurnalsubdetail_old, $m_coa_old, $m_kelasub_old, $coa, $old_year . '-01-01', $old_year . '-12-31');
                if ($datasubdetailformoldjournal) {

                    $sortsubdetail = 0;
                    foreach ($datasubdetailformoldjournal as $rowsubdetail) {
                        $subgl_id = 0;
                        //print_r($rowsubdetail);

                        if ($rowsubdetail['subgl_id'] > 0) {
                            $datasubgl = $setup->getbycodeandkelsubid_subgl($m_subgl_new, $kelsub_id, $rowsubdetail['code']);
                            $subgl_id = $datasubgl['subgl_id'];
                        }


                        $recordsubdetail = array(
                            "project_id" => $setup->_project_id,
                            "pt_id" => $setup->_pt_id,
                            "journal_id" => $journal_id,
                            "journaldetail_id" => $journaldetail_id,
                            "coa_id" => $coa_id,
                            "kelsub_id" => $kelsub_id,
                            "subgl_id" => $subgl_id,
                            "code" => $rowsubdetail['code'],
                            "code1" => $rowsubdetail['code1'],
                            "code2" => $rowsubdetail['code2'],
                            "code3" => $rowsubdetail['code3'],
                            "code4" => $rowsubdetail['code4'],
                            "keterangan" => " ENDING BALANCE " . $old_year,
                            "amount" => floatval($rowsubdetail['amountsubdetail']),
                            "addon" => date('Y-m-d H:i:s'),
                            "addby" => $setup->_user_id,
                        );
                        $setup->insertdata_v4($td_jurnalsubdetail_new, $recordsubdetail);
                    }
                }
            }
        }
    }

    public function createVoucher($new_db, $newyear) {
        $setup = new Gl_Models_General_Setdata();
        $th_jurnal_new = $new_db . $setup->_th_jurnal;
        $m_prefix_new = $new_db . $setup->_m_prefix;

        $dataprefix = $setup->getdata_prefixbycode($m_prefix_new, 'MJ');
        if ($dataprefix) {
            $record = array(
                "sort" => 1,
                "project_id" => $setup->_project_id,
                "pt_id" => $setup->_pt_id,
                "prefix_id" => $dataprefix['prefix_id'],
                "voucher_no" => 'MJ0001/01',
                "voucher_date" => $newyear . '-01-01',
                "debit_total" => 0,
                "credit_total" => 0,
                "selisih" => 0,
                "addon" => date('Y-m-d H:i:s'),
                "addby" => $setup->_user_id,
            );

            $setup->insertdata_v4($th_jurnal_new, $record);
            $datavoucher = $setup->getdata_voucher($th_jurnal_new, 'MJ0001/01');
            if ($datavoucher) {
                return $datavoucher;
            } else {
                return null;
            }
        }
    }

}
