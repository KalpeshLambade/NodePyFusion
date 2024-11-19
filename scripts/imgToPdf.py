import sys
from PIL import Image
import os

def images_to_pdf(images_folder, output_pdf_folder, output_pdf_filename):
    # Create the output_pdf folder if it doesn't exist
    if not os.path.exists(output_pdf_folder):
        os.makedirs(output_pdf_folder)
    
    # Get the full path for the output PDF
    output_pdf_path = os.path.join(output_pdf_folder, output_pdf_filename)

    # Get all image file paths in the folder
    image_files = sorted([
        os.path.join(images_folder, file)
        for file in os.listdir(images_folder)
        if file.endswith(('.png', '.jpg', '.jpeg'))
    ])
    
    if not image_files:
        print("No images found in the folder.")
        return
    
    # Open the first image and convert others to the same mode
    image_list = []
    for file in image_files:
        img = Image.open(file).convert("RGB")  # Convert to RGB
        image_list.append(img)
    
    # Save all images into a single PDF
    image_list[0].save(output_pdf_path, save_all=True, append_images=image_list[1:])
    print(f"PDF saved to {output_pdf_path}")

#Main Function
def main():
    # Get the command line arguments passed by the JavaScript code
    arguments = sys.argv[1:]  # sys.argv[0] is the script name
    if len(arguments) < 2:
        print("Error: Not enough arguments provided")
        sys.exit(1)

    # Extract the arguments
    images_folder = arguments[0]
    output_pdf_folder = arguments[1]
    output_pdf_filename = arguments[2]

    images_to_pdf(images_folder, output_pdf_folder, output_pdf_filename)


if __name__ == "__main__":
    main()