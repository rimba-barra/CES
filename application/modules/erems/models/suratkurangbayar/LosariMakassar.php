<?php 
	
	require_once dirname(__DIR__) . '../../library/dompdf2/autoload.inc.php';
	use Dompdf\Dompdf;
	use Dompdf\Options;

	class Erems_Models_Suratkurangbayar_LosariMakassar{

		public function createPDF($html, $scheduleID){
			$fileName = 'suratkurangbayar_'.$scheduleID.'.pdf';
			$filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/suratkurangbayar/' . $fileName;
			$fileUrl = 'app/erems/uploads/pdf/suratkurangbayar/' . $fileName;
			$options = new Options();
			$options->set('defaultFont', 'Arial');
			$options->setIsRemoteEnabled(true);

			$dompdf = new Dompdf($options);
			$dompdf->setPaper('A4', 'portrait');
			$dompdf->loadHtml($html);
			$dompdf->render();
			$output = $dompdf->output();
    		if(file_put_contents($filePath, $output)){
    			return $fileUrl;
    		}else{
    			return 0;
    		}
		}
    
	    public function getHTML() {

	        $html = "
	        	<style>
	        		body{
						padding: 20px;
						font-size:12px;
	        		}
	        		.title{
	        			text-align: center;
	        		}
	        		.address{
	        			width: 700px;
	        			display: block;
	        		}
	        		.head{
	        			font-weight: bold;
	        		}
	        		table{
	        			width: 100%;
	        		}
	        		table, th, td {
					    border: 1px solid black;
					    border-collapse: collapse;
					}
					td{
						text-align: right;
						padding: 3px;
					}
					.justify{
						text-align: justify;
					}
	        	</style>
                        <br/>
						<br/>
						<br/>
	        	<h3 class='title'>SURAT PEMBERITAHUAN KURANG BAYAR</h3>



	        	<p class='justify'>Makassar, {date_today}<br /> <br /> 
				   No&nbsp; &nbsp;: {no_surat}<br /> 
				   Hal&nbsp; : Surat Pemberitahuan Kurang Pembayaran<br /> 
				   Kepada Yth, Bapak/Ibu <strong>{customer_name}</strong><br /> 
				   <span class='address'>{customer_address}</span><br />
				   Dengan hormat,<br />
				   Berdasarkan catatan kami bahwa Bapak/Ibu sampai dengan tanggal <strong>{date_today} </strong> masih terdapat sisa pembayaran angsuran <strong>Type {productcategory} {type_name} ({type_code}) Blok {unit_number} Kaw. {cluster} ({cluster_code})</strong> yang diakibatkan karena adanya denda berjalan. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sbb (dalam rupiah) :&nbsp;
				</p>
				<div class='justify'>
				{{table}}
                                <p>
				   		Denda keterlambatan diatas akan bertambah sampai dengan pembayaran.<br />Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:
				</p>
				<ul>
			
				   <li>Transfer ke KSO Ciputra Yasmin BANK BCA, KCU Ahmad Yani, Makassar = 025-344-7777 atau rekening KSO Ciputra Yasmin, Bank Mandiri, KCU Kartini, Makassar = 152-00-337777-86 &nbsp; Mohon mencantumkan blok, No. rumah, kawasan dan nama pemesan pada kolom berita di slip transfer (bukti transfer mohon segera ditukar dengan kuitansi Citraland City Losari Makassar)</li>
				<!--   <li>Membayar langsung ke kasir penerimaan kantor pemasaran {project_name}, dengan cash atau giro/cek jatuh tempo.</li> -->
				</ul>
				<p>Kami memberikan waktu sampai dengan tanggal {date_2weeks} untuk penyelesaian pembayaran tunggakan diatas bersamaan dengan angsuran bulan berjalan. Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, sdri {user_fullname} di nomor telepon &nbsp; 0411 873626.<br /><br />Demikian hal ini kami sampaikan atas perhatiannya kami ucapkan terima kasih.<br />
				   <br />Hormat kami,<br />
				   <b>KSO CIPUTRA YASMIN</b>
				</p>
				<p>&nbsp;</p>
				<p>MITA YUSNIA</p>
				<p>Finance<br /><br />
				   <small>Note : Apabila pada saat surat ini diterima ternyata Bapak/Ibu telah melakukan penyetoran ke rekening kami, mohon untuk diabaikan surat kami atau mengirimkan bukti transfer/setoran via email : collection.clcl@ciputra.com Up. {user_fullname}., sehingga kami dapat melakukan pengecekan lebih lanjut.</small>
				</p>
				</div>
	        ";
			return $html;
	    }

	    public function generateTable($data) {
	    	$table = "<table>";
	    	$table .= "<tr class='head'>";
	            $table .= "<td> Jatuh tempo </td>";
	            $table .= "<td> Tanggal Payment </td>";
	            $table .= "<td> Jumlah </td>";
	            $table .= "<td> Denda </td>";
            $table .= "</tr>";
                $total = 0;
	    	foreach ($data as $d) {
	    		$table .= "<tr>";
	            $table .= "<td>".Erems_Box_Tools::formatDate($d['duedate'])."</td>";
	            $table .= "<td>".Erems_Box_Tools::formatDate($d['payment_payment_date'])."</td>";
	            $table .= "<td>".Erems_Box_Tools::toCurrency($d['amount'])."</td>";
	            $table .= "<td>".Erems_Box_Tools::toCurrency($d['remaining_denda'])."</td>";
	            $table .= "</tr>";
                    $total += $d['remaining_denda'];
	        }
                $table .= "<tr>";
	            $table .= "<td colspan='3'> Total </td>";
	          
	            $table .= "<td>".Erems_Box_Tools::toCurrency($total)."</td>";
            $table .= "</tr>";
	        $table .= "</table>";
	        return $table;
	    }
    
	}
