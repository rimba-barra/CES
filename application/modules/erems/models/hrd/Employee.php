<?php

/**
 * Description of Employee
 *
 * @author MIS
 */
class Erems_Models_Hrd_Employee extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {
    private $nik;
    private $name;
    private $pt;
    private $project;
    private $jabatan;
    private $description;
    private $jabatanCode;
    private $jabatanId;
    private $phoneNumber;
    private $alamat;
    private $nomorRekening;
    
    public function __construct($params=NULL) {
        parent::__construct();
        $this->embedPrefix = $params==NULL?"employee_":$params;
        $this->jabatan = new Erems_Models_Hrd_Jabatan();
        $this->pt = new Erems_Box_Models_Master_Pt();
        $this->project = new Erems_Box_Models_Master_Project();
    }
    
    public function getNik() {
        return $this->nik;
    }

    public function setNik($nik) {
        $this->nik = $nik;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt($pt) {
        $this->pt = $pt;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject($project) {
        $this->project = $project;
    }

    public function getJabatan() {
        return $this->jabatan;
    }

    public function setJabatan($jabatan) {
        $this->jabatan = $jabatan;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getJabatanCode() {
        return $this->jabatanCode;
    }

    public function setJabatanCode($jabatanCode) {
        $this->jabatanCode = $jabatanCode;
    }
    
    public function getJabatanId() {
        return $this->jabatanId;
    }

    public function setJabatanId($jabatanId) {
        $this->jabatanId = $jabatanId;
    }

    
        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['employee_id'])){
           $this->setId($x['employee_id']); 
        }
        if(isset ($x['employee_nik'])){
           $this->setNik($x['employee_nik']); 
        }
        if(isset ($x['employee_name'])){
           $this->setName($x['employee_name']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['position_position_id'])){
           $this->setJabatanId($x['position_position_id']); 
        }
        if(isset ($x['position_position'])){
           $this->setJabatanCode($x['position_position']); 
        }
        if(isset ($x['phone_number'])){
           $this->setPhoneNumber($x['phone_number']); 
        }
        if(isset ($x['nomor_rekening'])){
           $this->setNomorRekening($x['nomor_rekening']); 
        }
        if(isset ($x['address'])){
           $this->setAlamat($x['address']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'employee_id'=>$this->getId(),
            'employee_nik'=>$this->getNik(),
            'employee_name'=>$this->getName(),
            'description'=>$this->getDescription(),
            'position_position'=>$this->getJabatanCode(),
            'position_position_id'=>$this->getJabatanId(),
            'phone_number'=>$this->getPhoneNumber(),
            'nomor_rekening'=>$this->getNomorRekening(),
            'address'=>$this->getAlamat()
            
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt(),$this->getJabatan());
    }
    
    function getPhoneNumber() {
        return $this->phoneNumber;
    }

    function getAlamat() {
        return $this->alamat;
    }

    function getNomorRekening() {
        return $this->nomorRekening;
    }

    function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }

    function setAlamat($alamat) {
        $this->alamat = $alamat;
    }

    function setNomorRekening($nomorRekening) {
        $this->nomorRekening = $nomorRekening;
    }


    
    


}

?>
