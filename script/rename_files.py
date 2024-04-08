import os
import shutil

def move_images_to_questions(directory):
    if not os.path.isdir(directory):
        print("Belirtilen dizin bulunamadı.")
        return

    for root, dirs, files in os.walk(directory):
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            print("dir_path: ", dir_path)
            if os.path.isdir(dir_path):
                image_files = [f for f in os.listdir(dir_path) if f.endswith('.jpg') or f.endswith('.JPG')]
                image_files.sort()
                for i, image_file in enumerate(image_files):
                    image_path = os.path.join(dir_path, image_file)
                    new_image_name = f"{i + 1}.jpg"
                    new_image_path = os.path.join(dir_path, new_image_name)
                    shutil.move(image_path, new_image_path)
                    print(f"{image_file} -> {new_image_name}")

directory_path = "/Users/altintas/Developer/NextJS/mindzone/public/images/weekGames/week_four/cognitive_flexibility"
move_images_to_questions(directory_path)
