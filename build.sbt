import com.tuplejump.sbt.yeoman.Yeoman

name := "play-angular-seed"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache
)

play.Project.playJavaSettings ++ (Yeoman.yeomanSettings ++ Yeoman.withTemplates)
