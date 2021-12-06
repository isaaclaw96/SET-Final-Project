<?php

namespace App\Http\Controllers\API;

use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DateTime;

class TaskController extends Controller
{
    //

    public function index($id){
        $category = Task::join('users','users.id','=','tasks.user_id')->where('tasks.user_id',$id)->get(['tasks.task_title','tasks.id','tasks.status','tasks.user_id']);

        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function details($id)
    {
        $category = Task::join('users','users.id','=','tasks.user_id')->where('tasks.user_id',$id)->get(['tasks.task_title','tasks.created_at','tasks.status']);

        return response()->json([
            'category' => $category
        ], 200);
    }

    public function create($id, Request $request)
    {

        $validator = Validator::make($request->all(),[
            'task'=> 'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 400,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $category = new Task;
            $category->user_id = $id;
            $category->task_title = $request->input('task');
            $category->status = 1;
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => "Added Task!",
                'data' => $category,
            ]);
        }

    }

    public function edit($id, Request $request)
    {
        $validator = Validator::make($request->all(),[
            'edit'=> 'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $category = Task::find($id);
            if($category)
            {
                $category->task_title = $request->input('edit');
                $category->save();
                return response()->json([
                    'status' => 200,
                    'message' => "Updated Task!",
                ]);
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' => "ID Not Found!",
                ]);
            }


        }
    }

    public function delete($id)
    {
        $category = Task::find($id);
        if($category)
        {
            $category->status = 0;
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Delete Successful!',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> '404',
                'message' => 'ID Not Found!',
            ]);
        }

    }

    public function count($id){

        $matchThese = ['user_id' => $id, 'status' => 1];
        $category = Task::where($matchThese)->get();
        $count = $category->count();
        return response()->json([
            'count' => $count,
            'category' => $category,
        ]);
    }

    public function dateFormat()
    {

        $category = new DateTime('tasks.created_at');

        $category->format('d-m-Y');

        return response()->json([
            'category' => $category,
        ]);
    }
}
