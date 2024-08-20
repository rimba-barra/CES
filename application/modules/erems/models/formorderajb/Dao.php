<?php

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Formorderajb_Dao extends Erems_Box_Models_App_AbDao{
   
    
    
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Formorderajb_FormOrderAJB $fa){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_formorderajb_read',
                $fa->getProject()->getId(),$fa->getPt()->getId(),$r->getPage(),$r->getLimit(),$r->getOthersValue("unit_number"),
                $r->getOthersValue("customer_name")
                );
        return $hasil;
    }
    
    public function getOne($id){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_formorderajbdetail_read',
                intval($id)
                );
        return $hasil;
    }
    
   
    
    public function save(Erems_Models_Formorderajb_FormOrderAJB $fa){
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_formorderajb_create',$fa->getAddBy(),
                $fa->getProject()->getId(),$fa->getPt()->getId(),
                $fa->getPurchaseletter()->getId(),
                $fa->getNomor(),$fa->getDate(),
				
				/* add by TB on 2019-07-18 */
				$fa->getBiayaAjbBbn(),$fa->getBiayaBphtb(),
                $fa->getIsLunas(),$fa->getIsTerbangun(),
                $fa->getIsBphtb(),
                $fa->getIsPbb(),
                $fa->getIsSudahTerima(),
                $fa->getIsBiayaAjbBbn(),
                $fa->getIsSkbSsp(),
                $fa->getPbbTahun(),
                $fa->getPbbNjop(),
                $fa->getPbbLuasTanah(),
                $fa->getPbbLuasBangunan(),
                $fa->getIsTerbitSHGB(),
                $fa->getShgbNomor(),
                $fa->getShgbLuas(),
                $fa->getShgbKelurahan(),
                $fa->getIsKhususHPL(),
                $fa->getTerbitgsNo(),
                $fa->getTerbitgsLuas(),
                $fa->getIsKtpSuami(),
                $fa->getIsKtpIstri(),
                $fa->getIsKskkk(),
                $fa->getIsAktaKawin(),
                $fa->getIsNpwp(),
                $fa->getIsGantiNama(),
                $fa->getIsAktaKelahiran(),
                $fa->getIsRetribusi(),
                $fa->getRetribusiPeriode(),
                $fa->getIsSpt(),
                $fa->getIsSppjb(),
                $fa->getIsBajb(),
                $fa->getIsImb(),
                $fa->getIsKprSpk(),
                $fa->getKprSpkNote(),
                $fa->getIsSpTransferCustomer(),
                $fa->getIsKetDireksi(),
                $fa->getNote(),
                $fa->getPemberiName(),
                $fa->getPemberiJabatan(),
                $fa->getPemberiTelp(),
                $fa->getPenerimaName(),
                $fa->getPenerimaDate(),
                $fa->getKirimNotarisDate(),
                $fa->getKirimNotarisCp3(),
                $fa->getKirimNotarisPenerima(),
                $fa->getPosisiBerkas(),
                $fa->getPosisiBerkasCSDate(),
                $fa->getPosisiBerkasBackOfficeDate(),
                $fa->getPosisiBerkasCekFinanceDate(),
                $fa->getPosisiBerkasAmbilSertifikatDate(),
                $fa->getPosisiBerkasKirimNotarisDate()
                );
      
       
        /*
       
        $hasil = $this->dbTable->SPUpdate('sp_blockb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        */
     
        return $hasil;
    }
    
    
    
    public function dataExist(Erems_Models_Formorderajb_FormOrderAJB $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_formorderajbexist_read',$ft->getProject()->getId(),$ft->getPt()->getId(),$ft->getNomor());
        
        return $hasil;
    }
    
    public function dataExistbyUnit(Erems_Box_Models_Master_Project $projectId,Erems_Box_Models_Master_Pt $ptId,$id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_formorderajbexistbyunit_read',$projectId->getId(),$ptId->getId(),$id);
        
        return $hasil;
    }
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Formorderajb_FormOrderAJB $fa){
        $hasil = 0;
        
        if($fa->getId()==0){
            return 0;
        }
      
        $hasil = $this->dbTable->SPUpdate('sp_formorderajb_update',$fa->getAddBy(),
                $fa->getId(),
                $fa->getPurchaseletter()->getId(),
                $fa->getNomor(),$fa->getDate(),
                $fa->getBiayaAjbBbn(),$fa->getBiayaBphtb(),
                $fa->getIsLunas(),$fa->getIsTerbangun(),
                $fa->getIsBphtb(),
                $fa->getIsPbb(),
                $fa->getIsSudahTerima(),
                $fa->getIsBiayaAjbBbn(),
                $fa->getIsSkbSsp(),
                $fa->getPbbTahun(),
                $fa->getPbbNjop(),
                $fa->getPbbLuasTanah(),
                $fa->getPbbLuasBangunan(),
                $fa->getIsTerbitSHGB(),
                $fa->getShgbNomor(),
                $fa->getShgbLuas(),
                $fa->getShgbKelurahan(),
                $fa->getIsKhususHPL(),
                $fa->getTerbitgsNo(),
                $fa->getTerbitgsLuas(),
                $fa->getIsKtpSuami(),
                $fa->getIsKtpIstri(),
                $fa->getIsKskkk(),
                $fa->getIsAktaKawin(),
                $fa->getIsNpwp(),
                $fa->getIsGantiNama(),
                $fa->getIsAktaKelahiran(),
                $fa->getIsRetribusi(),
                $fa->getRetribusiPeriode(),
                $fa->getIsSpt(),
                $fa->getIsSppjb(),
                $fa->getIsBajb(),
                $fa->getIsImb(),
                $fa->getIsKprSpk(),
                $fa->getKprSpkNote(),
                $fa->getIsSpTransferCustomer(),
                $fa->getIsKetDireksi(),
                $fa->getNote(),
                $fa->getPemberiName(),
                $fa->getPemberiJabatan(),
                $fa->getPemberiTelp(),
                $fa->getPenerimaName(),
                $fa->getPenerimaDate(),
                $fa->getKirimNotarisDate(),
                $fa->getKirimNotarisCp3(),
                $fa->getKirimNotarisPenerima(),
                $fa->getPosisiBerkas(),
                $fa->getPosisiBerkasCSDate(),
                $fa->getPosisiBerkasBackOfficeDate(),
                $fa->getPosisiBerkasCekFinanceDate(),
                $fa->getPosisiBerkasAmbilSertifikatDate(),
                $fa->getPosisiBerkasKirimNotarisDate()
                );
     
              
              //  var_dump($this->dbTable);
        return $hasil;
    }

    

    public function delete($ids, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_formorderajb_destroy',$ids, $session->getUserId());
        return $row;
    }
}
