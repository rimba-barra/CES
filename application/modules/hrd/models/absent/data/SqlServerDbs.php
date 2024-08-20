<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SqlServerDbs
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Absent_Data_SqlServerDbs {

    public static function getDb($projectId, $ptId) {
        /* SWITCH SQLSERVER DATABASE ABSENT  */
                
        if ($projectId == 2013 && $ptId == 2088) { // Data finger print LAMPUNG
            return new Hrd_Models_Absent_Data_SqlServerLampung($projectId, $ptId);
        } else if ($projectId == 30 && $ptId == 2092) { // Data finger print BAGYA MEDAN
            return new Hrd_Models_Absent_Data_SqlServerLampung($projectId, $ptId);
        } else if ($projectId == 3016 && $ptId == 2090) { // Data finger print CMN Jakarta
            return new Hrd_Models_Absent_Data_SqlServerCmn($projectId, $ptId);
        } else if ($projectId == 1 && $ptId == 1) { // Data finger print Kantor Pusat Jakarta
            //return new Hrd_Models_Absent_Data_SqlServerKantorPusat($projectId,$ptId);
            return new Hrd_Models_Absent_Data_SqlServer();
        //} else if ($projectId == 4038 && $ptId == 20) { // Data finger print Ciputra Artpreneur - Ciputra Art Management
        //    return new Hrd_Models_Absent_Data_SqlServerArt($projectId, $ptId);
            
        } else if ($projectId == 4052 && $ptId == 44) { // Data finger print Ciputra Artpreneur - Ciputra Art Management
            return new Hrd_Models_Absent_Data_SqlServerHotelsemarang($projectId, $ptId);
        
        // Data finger print Citra Raya
        } else if ($projectId == 3 && $ptId == 30) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);          
        } else if ($projectId == 3 && $ptId == 3191) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);            
        } else if ($projectId == 4034 && $ptId == 2130) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);
        } else if ($projectId == 4034 && $ptId == 3146) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);
        } else if ($projectId == 5104 && $ptId == 6248) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);  
        } else if ($projectId == 4061 && $ptId == 3207) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);  
        } else if ($projectId == 81 && $ptId == 17) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);  
        } else if ($projectId == 3021 && $ptId == 2119) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);  
        } else if ($projectId == 4031 && $ptId == 3114) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);  
        } else if ($projectId == 2056 && $ptId == 3203) { 
            return new Hrd_Models_Absent_Data_SqlServerCitraraya($projectId, $ptId);
            
            /*
        // Data finger print Citra Garden
        } else if ($projectId == 2 && $ptId == 26) { 
            return new Hrd_Models_Absent_Data_SqlServerCitragarden($projectId, $ptId); 
        } else if ($projectId == 2 && $ptId == 27) { 
            return new Hrd_Models_Absent_Data_SqlServerCitragarden($projectId, $ptId); 
        } else if ($projectId == 2 && $ptId == 28) { 
            return new Hrd_Models_Absent_Data_SqlServerCitragarden($projectId, $ptId);  
        } else if ($projectId == 2 && $ptId == 43) { 
            return new Hrd_Models_Absent_Data_SqlServerCitragarden($projectId, $ptId);  
        } else if ($projectId == 2 && $ptId == 1089) { 
            return new Hrd_Models_Absent_Data_SqlServerCitragarden($projectId, $ptId); 
        } else if ($projectId == 2 && $ptId == 3158) { 
            return new Hrd_Models_Absent_Data_SqlServerCitragarden($projectId, $ptId);  
        } else if ($projectId == 2 && $ptId == 3205) { 
            return new Hrd_Models_Absent_Data_SqlServerCitragarden($projectId, $ptId);  
                  */
        // KP
        //} else if ($projectId == 1 && $ptId == 1) { 
        } else if ($projectId == 1) { 
            return new Hrd_Models_Absent_Data_SqlServer();              
 
        } 

        //dummy
        // else if ($projectId == 5096 && $ptId == 5232) { 
        //     return new Hrd_Models_Absent_Data_SqlServer();              
            
        // } 
        
        else {
            
            // sementara apply hanya untuk sh3a dan sh3b
            return new Hrd_Models_Absent_Data_SqlServerProject($projectId, $ptId);
        }
        
        /* END SWITCH SQLSERVER DATABASE ABSENT  */
    }

}
