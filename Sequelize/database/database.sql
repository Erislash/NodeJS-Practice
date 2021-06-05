CREATE TABLE Posts (
    ID int AUTO_INCREMENT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Body TEXT NOT NULL,
    CONSTRAINT PK_Posts PRIMARY KEY (ID)
)Engine=InnoDB;

INSERT INTO Posts VALUES(NULL, "Why does R is called \"err\"?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac dignissim magna. Morbi consequat metus vel leo commodo, sit amet facilisis sem rhoncus. Duis orci ligula, lacinia varius gravida sed, lacinia eu turpis. Ut cursus leo eu posuere tempor. Donec vitae nisi varius, cursus enim ut, volutpat lacus. Aliquam rhoncus eu justo nec pharetra. Nunc sollicitudin gravida justo, sit amet fermentum leo vehicula non. Donec porttitor odio nisl, id volutpat tortor lobortis a. Suspendisse in massa porttitor, scelerisque risus in, feugiat nisi. Aliquam erat volutpat. Cras sagittis aliquam tortor ac egestas. Cras tincidunt elementum faucibus. Fusce arcu est, vulputate at maximus a, malesuada eu augue. Pellentesque euismod diam et leo egestas, eget sollicitudin turpis bibendum. Sed placerat libero non facilisis vehicula.

Maecenas mauris justo, ultricies quis consequat quis, luctus vitae velit. Nunc porta mollis diam, in volutpat ex efficitur a. Donec sit amet sollicitudin est, sed porta mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin tincidunt accumsan congue. Duis posuere lacinia viverra. In lobortis ullamcorper ex, ac aliquet eros ultricies at.

Donec varius, ipsum sit amet volutpat molestie, nulla arcu auctor enim, ut rhoncus nunc eros nec justo. Nullam lacinia massa pellentesque tempor fermentum. Ut eu nibh ut nisl volutpat accumsan. Phasellus ac lacus vitae nulla sagittis elementum a a quam. Maecenas porttitor laoreet odio, eget aliquet risus. Maecenas ac nibh et ante auctor tempus. Etiam posuere pharetra tempor. Pellentesque sodales placerat lectus, id elementum augue.");