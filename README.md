Sweeft Technical Task - Images Gallery from unslplash

Description:
This is a photo gallery app with the following features: From the Unsplash database, it fetches the most popular photos according to the relevant topic specified in the search box. The app has an infinite scroll, it brings 20 popular photos at the initial stage, and after each scroll, it adds 20 new photos. Clicking on each photo brings up the full version of that photo in high quality, showing detailed data about the number of downloads, likes, and other options. Each topic searched by the user is stored on the history page, when going to this page, the user can see his search history and easily go to the photos corresponding to the mentioned topics.

Installation:

Warning ! -If you don't have an Unsplash developer profile made where you are given a special Access_key, you won't be able to run the project locally. Because when sending requests, the access_key needed for authorization should be included in the header: headers: {
Authorization: `Client-ID ${process.env.NEXT_UNSPLASH_ACCESS_KEY}`,
}
For this, register on Unsplash, create a new application that will give you this key, and then save this access and secret key in the .env.local file, and pass it to the request header.

გაფრთხილება ! - თუ თქვენ არ გაქვთ unsplash developer პროფიკი გაკეთებული, სადაც სპეციალურ Access_key-ს გაძლევთ, ვერ შეძლებთ პროექტის ლოკალურ გარემოში გაშვებას. რადგან რექუესთების გაგზავნის დროს, ჰედერში უნდა გაატანოთ ავტორიზაციისთვის საჭირო access_key : headers: {
Authorization: `Client-ID ${process.env.NEXT_UNSPLASH_ACCESS_KEY}`,
}
ამისთვის დარეგისტრირდით unsplesh-ზე, შექმენით ახალი აპლიკაცია რომელიც მოგცემთ ამ ქის, ხოლო შემდგომ ეს access და secret key შეინახეთ .env.local ფაილში, და აქედან გადააწოდეთ რექუესთის ჰედერს

1. Create a new file in your VSCode, copy the mentioned repository link, and command -git clone https://github.com/maghradz3/Sweeft-Technical-Task.git

Run VScode in the terminal and the repository of said project will be downloaded. run the command: npm install,
to install the appropriate dependencies.

After that, enter the following command in the terminal: npm run dev, and the project will run locally in your browser.

2. Download the GitHub repository zip file, extract it, and run it with VScode. Install npm with the command: npm install.
   After that, enter the following command in the terminal: npm run dev, and the project will run locally in your browser.

Demo: https://sweeft-technical-task.vercel.app/

Technologies Used:

1.  1. Next.js 14,
    2. Tanstack query(with prefetching and dehidrate data),
    3. Tailwind CSS
    4. React Tilt
    5. Framer Motion
    6. Unsplash Developer console, for creating app and Use it's API

Feautres:

1. Through the tanstack query, I fetch the initial data first on the server, using prefetch and dehydration, which allows the data to be rendered quickly on the client side.
2. during infinite scrolling, I have used Tanstack Query's excellent feature, useInfiniteQuery, which allows me to update the updated data on a specific change of stone when a specific condition is met.
3. After opening the data once, it is cached, after which the said data comes from the cache again and no further requests are sent to the server.
4. I save the topics recorded by the user in the search in local storage, and later I display them on the history page.
5. When clicking on each card, a new request is sent, which, with the ID of a specific photo, brings the date of the given photo, which I display in the modal window and displays detailed information.
6. I have done debouncing on the input component, i.e. without a button, a few seconds after the end of typing on the user's keyboard, an updated request is sent, or updated data comes from the cache
