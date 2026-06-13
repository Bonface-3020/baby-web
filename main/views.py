from django.shortcuts import render, redirect
from django.contrib import messages


def home(request):
    return render(request, 'main/home.html')


def about(request):
    testimonials = [
        {
            'name': 'Amina Hassan',
            'location': 'Bamburi, Mombasa',
            'text': 'Sunshine Tots has been a blessing to our family! My daughter Zara is so happy and has learned so much. The teachers are incredibly caring and professional. I highly recommend this daycare to every parent in Mombasa.',
            'stars': 5,
            'avatar': '👩🏾',
        },
        {
            'name': 'James Mwangi',
            'location': 'Nyali, Mombasa',
            'text': 'I was nervous about leaving my son at a daycare, but Sunshine Tots made us feel so welcome. The facilities are clean, safe, and the staff are always smiling. My son now begs to go every morning!',
            'stars': 5,
            'avatar': '👨🏿',
        },
        {
            'name': 'Fatuma Ali',
            'location': 'Shanzu, Mombasa',
            'text': 'The educational programs here are amazing. My twins have developed incredible social skills and creativity since joining. The blend of play and learning is exactly what young children need. Asante sana Sunshine Tots!',
            'stars': 5,
            'avatar': '👩🏿',
        },
        {
            'name': 'David Ochieng',
            'location': 'Mkomani, Mombasa',
            'text': 'The staff at Sunshine Tots treat every child as their own. My daughter has grown so much in confidence. The meals are nutritious, the environment is safe, and the love shown to the children is extraordinary.',
            'stars': 5,
            'avatar': '👨🏾',
        },
        {
            'name': 'Grace Wanjiru',
            'location': 'Kisauni, Mombasa',
            'text': 'Outstanding daycare! The curriculum is well-structured and the staff communicate with parents regularly. I love their WhatsApp updates with photos of the children\'s activities. Five stars without hesitation!',
            'stars': 5,
            'avatar': '👩🏾',
        },
        {
            'name': 'Omar Salim',
            'location': 'Bamburi, Mombasa',
            'text': 'We have had our son at Sunshine Tots for two years now. The progress he has made is remarkable. He can count, identify colors, and his Swahili and English have improved tremendously. Wonderful team!',
            'stars': 5,
            'avatar': '👨🏿',
        },
    ]
    return render(request, 'main/about.html', {'testimonials': testimonials})


def blog(request):
    posts = [
        {
            'id': 1,
            'title': 'Why Play is the Best Way for Children to Learn',
            'date': 'June 5, 2025',
            'category': 'Education',
            'excerpt': 'Research shows that children learn most effectively through play. At Sunshine Tots, we design every activity to be both fun and educational, helping our little ones develop critical thinking, creativity, and social skills from a very young age.',
            'image': 'blog_img1.png',
            'read_time': '4 min read',
            'author': 'Teacher Amina',
        },
        {
            'id': 2,
            'title': 'Music & Movement: Raising Happy, Confident Children',
            'date': 'May 20, 2025',
            'category': 'Activities',
            'excerpt': 'Our weekly music and movement sessions are among the most loved activities at Sunshine Tots. Children who engage in music early develop stronger language skills, better memory, and higher emotional intelligence. Come see how we make music magic!',
            'image': 'blog_img2.png',
            'read_time': '3 min read',
            'author': 'Teacher Grace',
        },
        {
            'id': 3,
            'title': 'Nutrition Matters: Feeding Little Minds and Bodies',
            'date': 'May 10, 2025',
            'category': 'Health & Wellness',
            'excerpt': 'At Sunshine Tots, we believe that proper nutrition is the foundation of healthy development. Our daily meals are carefully planned by a nutritionist to ensure your child gets all the vitamins and minerals they need to grow strong and sharp.',
            'image': 'blog_img3.png',
            'read_time': '5 min read',
            'author': 'Teacher Fatuma',
        },
        {
            'id': 4,
            'title': 'Building Social Skills Through Group Activities',
            'date': 'April 28, 2025',
            'category': 'Development',
            'excerpt': 'From sharing toys to teamwork in the playground, social development is at the heart of everything we do at Sunshine Tots. Discover how our group activities help children build friendships, empathy, and communication skills for life.',
            'image': 'kids_activities.png',
            'read_time': '4 min read',
            'author': 'Teacher James',
        },
        {
            'id': 5,
            'title': 'Outdoor Play at Sunshine Tots: More Than Just Fun',
            'date': 'April 15, 2025',
            'category': 'Activities',
            'excerpt': 'Our vibrant outdoor playground is a world of discovery for our children. From climbing frames to sandpits, every element is designed to develop gross motor skills, problem-solving abilities, and a love for the great outdoors in the beautiful Mombasa sunshine.',
            'image': 'kids_outdoor_play.png',
            'read_time': '3 min read',
            'author': 'Teacher Amina',
        },
        {
            'id': 6,
            'title': 'A Bedtime Routine That Works: Tips for Busy Parents',
            'date': 'April 2, 2025',
            'category': 'Parenting Tips',
            'excerpt': 'Getting toddlers to bed can be one of the biggest challenges parents face. Our expert caregivers share tried-and-tested bedtime routine tips that will help your little one settle down peacefully and wake up refreshed and ready to learn.',
            'image': 'kids_nap_time.png',
            'read_time': '6 min read',
            'author': 'Teacher Grace',
        },
    ]
    return render(request, 'main/blog.html', {'posts': posts})


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', '')
        subject = request.POST.get('subject', '')
        message = request.POST.get('message', '')
        # In production, send email here
        messages.success(request, f'Thank you {name}! Your message has been received. We will get back to you within 24 hours.')
        return redirect('contact_success')
    return render(request, 'main/contact.html')


def contact_success(request):
    return render(request, 'main/contact_success.html')
