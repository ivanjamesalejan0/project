<?php 

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;

class PdfGeneratorController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request) : JsonResponse
    {
        $validatedData = $request->validate([
            'firstname' => ['required', 'min:3', 'max:50'],
            'email' => ['required', 'email'],
        ]);

        $pdf = App::make('dompdf.wrapper');
        $pdf->loadView('pdfdocument', $validatedData);
        $filename = $request['firstname'] . '.pdf';
        $fileStoragePath = '/storage/pdf/' . $filename;
        $publicPath = public_path($fileStoragePath);

        $pdf->save($publicPath);

        return response()->json([
            "status" => "success",
            "message" => "PDF saved successfully ",
            "data" => [
                "url" => url($fileStoragePath)
            ]
        ]);


    }

}