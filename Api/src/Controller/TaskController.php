<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Task;
use App\Form\TaskType;
use App\Repository\CategoryRepository;
use App\Repository\TaskRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    /**
     * @Route("/api/tasks", name="task_list", methods={"GET"})
     */
    public function index(TaskRepository $taskRepository, Request $request): Response
    {
        $list = $taskRepository->findAll();

        return $this->json(
            $list,
            200,
            [],
            ["groups" => ["task:read"]]
        );
    }

    /**
     * @Route ("/api/tasks/create", name="task_create")
     */
    public function create(TaskRepository $taskRepository, CategoryRepository $categoryRepository, Request $request): Response
    {
        $task = new Task;

        if($request->getMethod() == 'POST')
        {
            $datas = json_decode($request->getContent(), true);

            $category = $categoryRepository->find($datas['categoryId']);
            $task->setTitle($datas['title']);
            $task->setCategory($category);
            $task->setStatus(1);
            $task->setCompletion(0);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($task);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'La tâche a bien été sauvegardée'
            );

            return new Response('',
                Response::HTTP_CREATED,
            );
        }


        return new Response(
            '',
            Response::HTTP_BAD_REQUEST
        );

    }
    /**
     * @Route("/api/tasks/update/{id}", name="task_update")
     */
    public function updateTask(Task $task, Request $request, CategoryRepository $categoryRepository)
    {
        if ($request->getMethod() === 'PUT')
        {
            $datas = json_decode($request->getContent(), true);
            $task->hydrate($datas);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($task);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'La tâche a bien été mise à jour'
            );

            return new Response('', Response::HTTP_NO_CONTENT);
        }
        return new Response('', Response::HTTP_NOT_FOUND);
    }

    /**
     * @Route("/api/tasks/delete/{id}", name="task_delete")
     */
    public function deleteTask(Task $task, Request $request)
    {
        if ($request->getMethod() === 'DELETE')
        {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($task);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'La tâche a bien été supprimée'
            );

            return new Response('', Response::HTTP_NO_CONTENT);
        }
        return new Response('', Response::HTTP_NOT_FOUND);
    }
}
