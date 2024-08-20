   <?php
class Gl_Models_Asset_Asset extends Gl_Box_Models_ObjectEmbedData implements Gl_Box_Kouti_Remora,  Gl_Box_Models_Master_InterProjectPt {
    public $project;
    public $pt;
    public $account;
    public $name;
    public $note;
 
   
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "assetdata_"; // nama ini digunakan untuk inisialisasi terhadap tabel, jangan pakai underscore
    }
    
    public function setArrayTable($dataArray = NULL) {
  
       $x = $dataArray==NULL?$this->arrayTable:$dataArray;       
       $this->setId(isset ($x['asset_id'])?$x['asset_id']:0); 
       $this->account = isset ($x['asset_account'])? $x['asset_account'] : NULL;
       $this->name = isset ($x['asset_name'])? $x['asset_name'] : NULL;
       $this->note = isset ($x['asset_note'])? $x['asset_note'] : NULL;
       
       unset($x);
    }
    
    public function getArrayTable() {     
        $x = array(
            'asset_id'=>$this->getId(),
            'asset_account'=>$this->account,
            'asset_name'=>$this->name,
            'asset_note'=>$this->note,
        );
      
        return $x;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Gl_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Gl_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Gl_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Gl_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


}               