<?php

class Gl_Models_Setlaprugilaba extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_rptformat';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_query = new Gl_Models_Generalmodel_Builtquery();
    }

    function setlaprugilabaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                if ($parameter == 'default') {
                    $result = $this->defaultRead($param);
                    $arraydata = $result[1];
                }

                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $arraydata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function defaultRead($param) {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            'L',
            $param['report_level'],
            $param['start'],
            $param['limit']
        );

        return $this->execSP3('sp_setlaprugilaba_read', $data);
    }

    function setlaprugilabaCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                if ($parameter == 'generate') {
                    $result = $this->setGenerate($param);
                }else if ($parameter == 'checkexist') {
                    $result = $this->checkExist($param);
                } else if($parameter == 'default'){
                    $result = $this->defaultCreate($param);
                }

                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['parameter'] = $parameter;
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['parameter'] = $parameter;
                    //$return['statusgenerate'] = $result[1];
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function setGenerate($param) {
            $dataparam = array(
                                $this->session->getCurrentProjectId(),
                                $this->session->getCurrentPtId(),
                                'L',
                                $param['from'],
                                $param['until']
              );        
            $this->execSP3('sp_setlaprugilaba_tmp_truncate', array(0));
            $this->execSP3('sp_setlapbalance_truncate', $dataparam);
            $rowcoalr = $this->execSP3('sp_setlaprugilaba_getcoalr', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId()));
            $profitloss_coa_from = $rowcoalr[0][0]['profitloss_coa_from'];
            $profitloss_coa_until = $rowcoalr[0][0]['profitloss_coa_until'];

            $desc1_coa_from = $rowcoalr[0][0]['desc1_coa_from'];
            $desc1_coa_until = $rowcoalr[0][0]['desc1_coa_until'];
            $desc2_coa_from = $rowcoalr[0][0]['desc2_coa_from'];
            $desc2_coa_until = $rowcoalr[0][0]['desc2_coa_until'];
            $sum1_note = $rowcoalr[0][0]['sum1_note'];

            $desc3_coa_from = $rowcoalr[0][0]['desc3_coa_from'];
            $desc3_coa_until = $rowcoalr[0][0]['desc3_coa_until'];
            $sum2_note = $rowcoalr[0][0]['sum2_note'];

            $desc4_coa_from = $rowcoalr[0][0]['desc4_coa_from'];
            $desc4_coa_until = $rowcoalr[0][0]['desc4_coa_until'];
            $sum3_note = $rowcoalr[0][0]['sum3_note'];

            $desc5_coa_from = $rowcoalr[0][0]['desc5_coa_from'];
            $desc5_coa_until = $rowcoalr[0][0]['desc5_coa_until'];
            $desc6_coa_from = $rowcoalr[0][0]['desc6_coa_from'];
            $desc6_coa_until = $rowcoalr[0][0]['desc6_coa_until'];
            $sum4_note = $rowcoalr[0][0]['sum4_note'];          
        
            $rowreven = $this->execSP3('sp_kodeaccountrugilaba_byparam', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),'L',$desc1_coa_from,$desc1_coa_until));
            $rowcost = $this->execSP3('sp_kodeaccountrugilaba_byparam', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),'L',$desc2_coa_from,$desc2_coa_until));
            $rowexpen = $this->execSP3('sp_kodeaccountrugilaba_byparam', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),'L',$desc3_coa_from,$desc3_coa_until));
            $rowoincome = $this->execSP3('sp_kodeaccountrugilaba_byparam', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),'L',$desc4_coa_from,$desc4_coa_until));
            $rowtax = $this->execSP3('sp_kodeaccountrugilaba_byparam', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),'L',$desc5_coa_from,$desc5_coa_until));
            $rowcompre = $this->execSP3('sp_kodeaccountrugilaba_byparam', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),'L',$desc6_coa_from,$desc6_coa_until));
            
            $arr_tmp = array();   
            $arr_all = array();            
        
            foreach ($rowreven[0] as $rowre) {
                $arr_tmp['coa_id']= $rowre['coa_id'];
                $arr_tmp['project_id']= $rowre['project_id'];
                $arr_tmp['pt_id']= $rowre['pt_id'];
                $arr_tmp['type']= $rowre['type'];
                $arr_tmp['coa']= $rowre['coa'];
                $arr_tmp['name']= $rowre['name'];
                $arr_tmp['level']= $rowre['level'];
                $arr_tmp['parent_id']= $rowre['parent_id'];
                $arr_tmp['parent_code']= $rowre['parent_code'];
                $arr_tmp['report']= $rowre['report'];
                $arr_tmp['kelsub_id']= $rowre['kelsub_id'];
                $arr_tmp['group_gl']= $rowre['group_gl'];
                $arr_tmp['coa_status']= $rowre['coa_status'];
                $arr_tmp['is_journal']= $rowre['is_journal'];
                
                 $arr_all[] =$arr_tmp;
               
            }
          
            foreach ($rowcost[0] as $rowco) {
                $arr_tmp['coa_id']= $rowco['coa_id'];
                $arr_tmp['project_id']= $rowco['project_id'];
                $arr_tmp['pt_id']= $rowco['pt_id'];
                $arr_tmp['type']= $rowco['type'];
                $arr_tmp['coa']= $rowco['coa'];
                $arr_tmp['name']= $rowco['name'];
                $arr_tmp['level']= $rowco['level'];
                $arr_tmp['parent_id']= $rowco['parent_id'];
                $arr_tmp['parent_code']= $rowco['parent_code'];
                $arr_tmp['report']= $rowco['report'];
                $arr_tmp['kelsub_id']= $rowco['kelsub_id'];
                $arr_tmp['group_gl']= $rowco['group_gl'];
                $arr_tmp['coa_status']= $rowco['coa_status'];
                $arr_tmp['is_journal']= $rowco['is_journal'];
                
                 $arr_all[] =$arr_tmp;
               
            }
            foreach ($rowexpen[0] as $rowex) {
                $arr_tmp['coa_id']= $rowex['coa_id'];
                $arr_tmp['project_id']= $rowex['project_id'];
                $arr_tmp['pt_id']= $rowex['pt_id'];
                $arr_tmp['type']= $rowex['type'];
                $arr_tmp['coa']= $rowex['coa'];
                $arr_tmp['name']= $rowex['name'];
                $arr_tmp['level']= $rowex['level'];
                $arr_tmp['parent_id']= $rowex['parent_id'];
                $arr_tmp['parent_code']= $rowex['parent_code'];
                $arr_tmp['report']= $rowex['report'];
                $arr_tmp['kelsub_id']= $rowex['kelsub_id'];
                $arr_tmp['group_gl']= $rowex['group_gl'];
                $arr_tmp['coa_status']= $rowex['coa_status'];
                $arr_tmp['is_journal']= $rowex['is_journal'];
                
                $arr_all[] =$arr_tmp;
               
            }
            foreach ($rowoincome[0] as $rowoin) {
                $arr_tmp['coa_id']= $rowoin['coa_id'];
                $arr_tmp['project_id']= $rowoin['project_id'];
                $arr_tmp['pt_id']= $rowoin['pt_id'];
                $arr_tmp['type']= $rowoin['type'];
                $arr_tmp['coa']= $rowoin['coa'];
                $arr_tmp['name']= $rowoin['name'];
                $arr_tmp['level']= $rowoin['level'];
                $arr_tmp['parent_id']= $rowoin['parent_id'];
                $arr_tmp['parent_code']= $rowoin['parent_code'];
                $arr_tmp['report']= $rowoin['report'];
                $arr_tmp['kelsub_id']= $rowoin['kelsub_id'];
                $arr_tmp['group_gl']= $rowoin['group_gl'];
                $arr_tmp['coa_status']= $rowoin['coa_status'];
                $arr_tmp['is_journal']= $rowoin['is_journal'];
                
                $arr_all[] =$arr_tmp;
               
            }
            foreach ($rowtax[0] as $rowt) {
                $arr_tmp['coa_id']= $rowt['coa_id'];
                $arr_tmp['project_id']= $rowt['project_id'];
                $arr_tmp['pt_id']= $rowt['pt_id'];
                $arr_tmp['type']= $rowt['type'];
                $arr_tmp['coa']= $rowt['coa'];
                $arr_tmp['name']= $rowt['name'];
                $arr_tmp['level']= $rowt['level'];
                $arr_tmp['parent_id']= $rowt['parent_id'];
                $arr_tmp['parent_code']= $rowt['parent_code'];
                $arr_tmp['report']= $rowt['report'];
                $arr_tmp['kelsub_id']= $rowt['kelsub_id'];
                $arr_tmp['group_gl']= $rowt['group_gl'];
                $arr_tmp['coa_status']= $rowt['coa_status'];
                $arr_tmp['is_journal']= $rowt['is_journal'];
                
                $arr_all[] =$arr_tmp;
               
            }
            foreach ($rowcompre[0] as $rowco) {
                $arr_tmp['coa_id']= $rowco['coa_id'];
                $arr_tmp['project_id']= $rowco['project_id'];
                $arr_tmp['pt_id']= $rowco['pt_id'];
                $arr_tmp['type']= $rowco['type'];
                $arr_tmp['coa']= $rowco['coa'];
                $arr_tmp['name']= $rowco['name'];
                $arr_tmp['level']= $rowco['level'];
                $arr_tmp['parent_id']= $rowco['parent_id'];
                $arr_tmp['parent_code']= $rowco['parent_code'];
                $arr_tmp['report']= $rowco['report'];
                $arr_tmp['kelsub_id']= $rowco['kelsub_id'];
                $arr_tmp['group_gl']= $rowco['group_gl'];
                $arr_tmp['coa_status']= $rowco['coa_status'];
                $arr_tmp['is_journal']= $rowco['is_journal'];
                
                $arr_all[] =$arr_tmp;
               
            }
          
    
        foreach ($arr_all as $rowcombine) {
            $datacombine = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $rowcombine['coa_id'],
                $rowcombine['type'],
                $rowcombine['coa'],
                $rowcombine['name'],
                $rowcombine['level'],
                $rowcombine['parent_id'],
                $rowcombine['parent_code'],
                $rowcombine['report'],
                $rowcombine['kelsub_id'],
                $rowcombine['group_gl'],
                $rowcombine['coa_status'],
                $rowcombine['is_journal'],
            );
            
         
           $this->execSP3('sp_setrugilabatmpreport_insert',$datacombine);
       }
        $resultdata = $this->execSP3('sp_setlaprugilabatmpreport_create', $dataparam);     
        $arrayheader = $this->setHeader(0, $param['until']);
        $this->buildchield($arrayheader);
        $this->setSort($param['until']);
        $this->changeHeaderifchieldempty($dataparam);
        $this->buildGrand($param['until']);
        $arrstatus = array(0, 'finish');
        return $arrstatus;
    }
    function changeHeaderifchieldempty($param){        
      $this->_query->changeheadertochield($param);
    }
    
    function setHeader($parent_coa = 0, $until = 0) {
        $data = array(
            $parent_coa
        );
        $result = $this->execSP3('sp_setlaprugilabatmpreport_read', $data);       
        $arraydata = $result[0];
        
        
        $recursive_header = array();
        $datacluster = array();
        foreach ($arraydata as $row) {

            if ($until > 3) {
                if ($row['journal'] == 0) {
                    $flag = 'H';
                } else {
                    $flag = 'I';
                }
                $flag = $flag;
            } else {
                if ($row['level'] == $until) {
                    $flag = 'I';
                } else {
                    $flag = 'H';
                }
                $flag = $flag;
            }


            $datacluster['tmp_id'] = $row['tmp_id'];
            $datacluster['coa_id'] = $row['coa_id'];
            $datacluster['coa'] = $row['coa'];
            $datacluster['report'] = $row['report'];
            $datacluster['last_level'] = $until;
            $datacluster['level'] = $row['level'];
            $datacluster['name'] = $row['name'];
            $datacluster['parent'] = $row['parent_code'];
            $datacluster['journal'] = $row['journal'];
            $datacluster['type'] = $row['type'];
            $datacluster['flag'] = $flag;
            $datacluster['child'] = $this->setHeader($row['coa'], $until);
            $recursive_header[] = $datacluster;
        }
        return $recursive_header;
    }

    function buildchield($data) {
        if (is_array($data)) {
            
            $rowcoalr = $this->execSP3('sp_setlaprugilaba_getcoalr', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId()));
            $profitloss_coa_from = $rowcoalr[0][0]['profitloss_coa_from'];
            $profitloss_coa_until = $rowcoalr[0][0]['profitloss_coa_until'];

            $desc1_coa_from = $rowcoalr[0][0]['desc1_coa_from'];
            $desc1_coa_until = $rowcoalr[0][0]['desc1_coa_until'];
            $desc2_coa_from = $rowcoalr[0][0]['desc2_coa_from'];
            $desc2_coa_until = $rowcoalr[0][0]['desc2_coa_until'];
            $sum1_note = $rowcoalr[0][0]['sum1_note'];

            $desc3_coa_from = $rowcoalr[0][0]['desc3_coa_from'];
            $desc3_coa_until = $rowcoalr[0][0]['desc3_coa_until'];
            $sum2_note = $rowcoalr[0][0]['sum2_note'];

            $desc4_coa_from = $rowcoalr[0][0]['desc4_coa_from'];
            $desc4_coa_until = $rowcoalr[0][0]['desc4_coa_until'];
            $sum3_note = $rowcoalr[0][0]['sum3_note'];

            $desc5_coa_from = $rowcoalr[0][0]['desc5_coa_from'];
            $desc5_coa_until = $rowcoalr[0][0]['desc5_coa_until'];
            $desc6_coa_from = $rowcoalr[0][0]['desc6_coa_from'];
            $desc6_coa_until = $rowcoalr[0][0]['desc6_coa_until'];
            $sum4_note = $rowcoalr[0][0]['sum4_note'];

            foreach ((array) $data as $row) {
             
                // for set data coa   
                $no = $row['tmp_id'];
                
               //added 02-09-2016 untuk filter flag
                if (!empty($row['child'])){
                    $flagdata='H';
                }else{
                    $flagdata='I';
                }
                
                
                $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . $row['name'], $row['level'], $flagdata, $row['type']);
                if (!empty($row['child'])) {
                    $this->buildchield($row['child']);
                    $no = $row['tmp_id'];
                    $tmp = explode(".", $row['coa']);
                    
                    
                    $d1u = explode(".", $desc1_coa_until);
                    $d2u = explode(".", $desc2_coa_until);                    
                    $d3u = explode(".", $desc3_coa_until);                    
                    $d4u = explode(".", $desc4_coa_until);                    
                    $d5u = explode(".", $desc5_coa_until);                    
                    $d6u = explode(".", $desc6_coa_until);                    
                    
                    $filter = intval($tmp[0] . $tmp[1] . $tmp[2]);
                    $coa_until1 = intval($d1u[0] . $d1u[1] . $d1u[2]);
                    $coa_until2 = intval($d2u[0] . $d2u[1] . $d2u[2]);
                    $coa_until3 = intval($d3u[0] . $d3u[1] . $d3u[2]);
                    $coa_until4 = intval($d4u[0] . $d4u[1] . $d4u[2]);
                    $coa_until5 = intval($d5u[0] . $d5u[1] . $d5u[2]);
                    $coa_until6 = intval($d6u[0] . $d6u[1] . $d6u[2]);
                    
                  
                    
                    
                    if ($row['level'] == '1' and ($filter >= intval($coa_until1) and $filter <= intval($coa_until2) )) {
                         //for set sum coa
                      $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . 'TOTAL ' . $row['name'], $row['level'], 'T', $row['type']);
                        //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', '');
                      //create grand
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no,'', $sum1_note, '0', 'G', '');
                       //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', ''); 
                    } else if ($row['level'] == '1' and ($filter >= intval($coa_until2) and $filter <= intval($coa_until3) )) {
                         //for set sum coa
                      $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . 'TOTAL ' . $row['name'], $row['level'], 'T', $row['type']);
                        //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', '');
                      //create grand
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no,'', $sum2_note, '0', 'G', '');
                       //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', ''); 
                    } else if ($row['level'] == '1' and ($filter >= intval($coa_until3) and $filter <= intval($coa_until4) )) {
                         //for set sum coa
                      $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . 'TOTAL ' . $row['name'], $row['level'], 'T', $row['type']);
                        //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', '');
                      //create grand
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no,'', $sum3_note, '0', 'G', '');
                       //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', ''); 
                    }else if ($row['level'] == '1' and ($filter >= intval($coa_until4) and $filter <= intval($coa_until6) )) {
                      //for set sum coa
                      $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . 'TOTAL ' . $row['name'], $row['level'], 'T', $row['type']);
                        //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', '');
                      //create grand
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no,'', $sum4_note, '0', 'G', '');
                       //for set space coa
                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', ''); 
                        
//                    }else if ($row['level'] == '1' and ($filter >= intval($coa_until5) and $filter <= intval($coa_until6) )) {
//                      //for set sum coa
//                      $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . 'TOTAL ' . $row['name'], $row['level'], 'T', $row['type']);
//                        //for set space coa
//                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', '');
//                      //create grand
//                      $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no,'', $sum4_note, '0', 'G', '');
//                       //for set space coa
//                      //$this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', ''); 
//                        
                    }else{
                        //for set sum coa
                        $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . 'TOTAL ' . $row['name'], $row['level'], 'T', $row['type']);
                        //for set space coa
                        $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', '');
                    }
                    
                    
                }
            }
        }
    }

    function insertbyGenerate($coa_id, $report, $last_level, $sort, $coa, $name, $level, $flag, $type) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa_id,
            $report,
            $last_level,
            $sort,
            $coa,
            $name,
            $level,
            $flag,
            $type,
            $this->session->getUserId(),
            1
        );  
       
        $this->execSP3('sp_setlaprugilaba_generate', $data);
    }

    function checkExist($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['coa'],
            $param['report_level']
        );

        return $this->execSP3('sp_setlaprugilaba_checkexist', $data);
    }

    function defaultCreate($param) {
        $paramcoa = array(
            $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['coa']
        );
        $rowdata = $this->execSP3('sp_coa_getbycoa', $paramcoa);
        $coa_id = ($rowdata[0][0]['coa_id']);
        if ($coa_id > 0) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['sort'],
                $coa_id,
                $param['coa'],
                $param['name'],
                'L',
                $param['report_level'],
                $param['level'],
                $param['type'],
                $param['flag'],
                $this->session->getUserId(),
                '1'
            );
            return $this->execSP3('sp_setlaprugilaba_create', $data);
        } else {
            return null;
        }
    }

    function setSort($lastlevel) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $lastlevel,
        );
        $result = $this->execSP3('sp_setlaprugilaba_readafter_generate', $data);
        $arraydata = $result[0];
        $no = 0;
        foreach ($arraydata as $row) {
            $no++;	     	
            if($lastlevel == $row['level'] and $row['flag']=='H'){
                $flag ='I';
            }else{
                $flag =$row['flag'];
            }
 
            $idreport = $row['rptformat_id'];
            $sort = $no;
	    $data = array($idreport,$sort,$flag);           
            $this->execSP3('sp_setlaprugilaba_updateafter_generate', $data);
        }
    }
    
    function buildGrand($lastlevel) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $lastlevel,
        );
        
        $result = $this->execSP3('sp_setlaprugilaba_readafter_generate', $data);
        $rowcoalr = $this->execSP3('sp_setlaprugilaba_getcoalr', array($this->session->getCurrentProjectId(),$this->session->getCurrentPtId()));
      
        $profitloss_coa_from = $rowcoalr[0][0]['profitloss_coa_from'];
        $profitloss_coa_until = $rowcoalr[0][0]['profitloss_coa_until'];
        
        $desc1_coa_from = $rowcoalr[0][0]['desc1_coa_from'];
        $desc1_coa_until = $rowcoalr[0][0]['desc1_coa_until'];
        $desc2_coa_from = $rowcoalr[0][0]['desc2_coa_from'];
        $desc2_coa_until = $rowcoalr[0][0]['desc2_coa_until'];
        $sum1_note = $rowcoalr[0][0]['sum1_note'];
        
        $desc3_coa_from = $rowcoalr[0][0]['desc3_coa_from'];
        $desc3_coa_until = $rowcoalr[0][0]['desc3_coa_until'];
        $sum2_note = $rowcoalr[0][0]['sum2_note'];
        
        $desc4_coa_from = $rowcoalr[0][0]['desc4_coa_from'];
        $desc4_coa_until = $rowcoalr[0][0]['desc4_coa_until'];
        $sum3_note = $rowcoalr[0][0]['sum3_note'];
        
        $desc5_coa_from = $rowcoalr[0][0]['desc5_coa_from'];
        $desc5_coa_until = $rowcoalr[0][0]['desc5_coa_until'];
        $desc6_coa_from = $rowcoalr[0][0]['desc6_coa_from'];
        $desc6_coa_until = $rowcoalr[0][0]['desc6_coa_until'];
        $sum4_note = $rowcoalr[0][0]['sum4_note'];
                       
        $array_gross = array();
        $array_operating_income = array();
        $array_earing = array();
        $net_income = array();
        
        $no = 0;
        $arraydata = $result[0];
        foreach ($arraydata as $row) {
            if($desc2_coa_until >= $row['coa'] and  $desc3_coa_from <= $row['coa']){
                
            }  
        }
    }

    function setlaprugilabaUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['rptformat_id'],
                    $param['sort'],
                    $param['coa'],
                    $param['name'],
                    $param['report_level'],
                    $param['level'],
                    $param['type'],
                    $param['flag'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_setlaprugilaba_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function setlaprugilabaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'rptformat_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_setlaprugilaba_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

}

?>