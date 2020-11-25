<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    /**
     * @Route("/api/categories", name="api_category_list")
     */
    public function index(CategoryRepository $categoryRepository, Request $request): Response
    {
        $list = $categoryRepository->findAll();

        return $this->json(
            $list,
            200,
            [],
            ["groups" => ["category:list"]]

        );
    }

    /**
     * @Route("/api/category/{id}", name="app_item_category")
     */
    public function unique(Category $category): Response
    {
        return $this->json(
            $category,
            200,
            [],
            ["groups" => ["category:item"]]
        );
    }
}
