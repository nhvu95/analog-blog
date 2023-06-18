---
title: 'Spring Core Technologies series. [Part1]'
description: 'Cause I did not focus on the back-end at the start, I believe that I was missed some core concepts of Spring and Spring Boot. This series is the way I recheck my knowledge and complement the missing part.'
date_start: '2021/12/28'
date_end: '2022/01/01'
published: true
image: 'https://i.imgur.com/driRgww.png'
header_image: 'https://i.imgur.com/LGxkTwi.png'
tags: ['Backend','SpringBoot', 'Did I Miss']
priority: 1
link: '/blog/spring-core-1'
slug: spring-core-1
location: 'Hanoi, Vietnam'
---

_**My study way is reading the Spring document, then I quote the main concept, and explain them in my way. Same as the Rubber Duck Debugging method. I just want to explain them twice, first read to understand, and second explain to understand.**_

## I. Overview about Spring IoC Container and Beans

First I will start with the defined in the [Spring document][1], they said:

>This chapter covers the Spring Framework implementation of the **Inversion of Control (IoC)** principle. **IoC is also known as dependency injection (DI)**. It is a process whereby objects define their dependencies (that is, the other objects they work with) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. **The container then injects those dependencies when it creates the bean**. **This process is fundamentally the inverse** (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies by using direct construction of classes or a mechanism such as the Service Locator pattern.

We can get some main concept in this paragraph, and I also explain the content in my way:  

1. IoC is stands for **Inversion of Control**.
2. IoC is also known as dependency injection (DI).  
_I believe that this concept is not correct in 100%, and the author wrote like this cause he want the reader easy to imagine and easy to approach content._  
Refer: [IoC vs DI][2]  
3. **Invesrion of Control** is a programming principle. The "Inversion" in the IoC mean that you "inversion/redirecting" the control from inside to external handler/controller. Instead of A contain, include, and control B in the directly way. The idea of IoC is let A call B, let B do the task itself then A react with the callback.  
4. **Dependency Injection** is the way people implement **IoC**. We also can call it a design pattern too, and it is about removing the dependencies from your code. Instead of initializing instances of classes or dependencies inside A, we initialize them at outside and pass them through the constructor or set method.  
Refer: [DI][3]  
5. Back to concepts of IoC and DI in Spring. The **Spring Container** is at the core of the Spring Framework.  
    **Spring Container will create the depencencies instance, objects, assembled them, then configure them, store and manage them.** And they was called **Beans**.  
    - When Beans were created, they will be injected into the class which is used through the constructor, get set method, or by Java reflection, or Service Locator pattern.  
    - Through Spring IoC you can configure the number of instances of the component, beans - whether the component is a singleton or not – and at what point the component is created and destroyed in memory.
    - Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

    ==> **By this way, Spring allows you to manage what implementations are used by leveraging dependency injection, resulting in cleaner, decoupled components.**

## II. Spring Container
In this part, the author wrote very clearly, so I just index the main content:
>- The `org.springframework.beans` and `org.springframework.context` packages are the basis for `Spring Framework’s IoC container`.  
>- **The `BeanFactory` interface provides an advanced configuration mechanism capable of managing any type of object. `ApplicationContext` is a sub-interface of `BeanFactory`**
>- In short, the **`BeanFactory` provides the configuration framework and basic functionality**, and the **`ApplicationContext` adds more enterprise-specific functionality**. You can view more detail about functionality in [here][4]
>- In most application scenarios, **explicit**(_rõ ràng_) **user code is not required to instantiate one or more instances of a Spring IoC container**. For example, in a web application scenario, a simple eight (or so) lines of boilerplate web descriptor XML in the web.xml

**This is The Represent of Spring IoC:**

>- **The `org.springframework.context.ApplicationContext` interface represents `the Spring IoC container` and is responsible for instantiating, configuring, and assembling the beans.**

**So, How Container (ApplicationContext) know which one should be assemble, intialize, configure and manage them?**

>- The container gets its instructions on what objects to instantiate, configure, and assemble by reading **configuration metadata**. **The configuration metadata** is represented in XML, Java annotations, or Java code. It lets you express the objects that compose your application and the rich interdependencies between those objects.

>The following diagram shows a high-level view of how Spring works. **Your application classes are combined with configuration metadata** so that, **after the ApplicationContext is created and initialized, you have a fully configured and executable system or application**.

![Spring diagram 1](https://i.imgur.com/ebjnujy.png?style=centerme)

## III. Configuration Metadata

As the last part the document already mention about the configuration metadata.
> This configuration metadata represents how you, as an application developer, tell the Spring container to instantiate, configure, and assemble the objects in your application.  

There are few way to configure metadata:

1. Configuration metadata is traditionally supplied in a simple and intuitive **XML format**. Pros, XML excels at wiring up components without touching their source code or recompiling them.

Instead of using XML to describe a bean wiring, the developer moves the configuration into the component class itself by using annotations on the relevant class, method, or field declaration.

2. Spring 2.5 introduced support for annotation-based configuration metadata. [**Annotation-based configuration**][5] ([@Autowired][5.1], @PostConstruct, @PreDestroy... they was called JSR-250)

3. Starting with Spring 3.0, You can define beans external to your application classes by using Java rather than XML files. [**Java-based configuration**][6]. To use these new features, see the [@Configuration][6.1], [@Bean][6.2], [@Import][6.3], and [@DependsOn][6.4] annotations.

## IV. Instantiating a Container

In stand-alone applications, it is common to create an instance of ClassPathXmlApplicationContext or FileSystemXmlApplicationContext. **This is the way we create ApplicationContext in Spring Application**
```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```
and there is example content of xml. All the beans have to put on `<beans>` tag. And `<beans>` have to manage at least 1 `<bean>`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- services -->
    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions for services go here -->
</beans>
```

And we also can write like this:

```xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

**But in Spring Boot**, Application context will default return after ``SpringApplication.run()`` was called.

```java
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class HostingImageApplication {
    public static void main(String[] args) {
        SpringApplication.run(HostingImageApplication.class, args);
        // ApplicationContext context = SpringApplication.run(HostingImageApplication.class, args);
    }
}
```

### V. Get current ApplicationContext, Beans

1. We can inject it as normal, like this

```java
@Autowired
private ApplicationContext appContext;
```

2. Or implement the ApplicationContextAware, by this way we can use it in side a non-bean class.

```java
package com.java2novice.spring;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class ApplicationContextProvider implements ApplicationContextAware{
    private static ApplicationContext context;

    public static ApplicationContext getApplicationContext() {
        return context;
    }

    @Override
    public void setApplicationContext(ApplicationContext ac)
            throws BeansException {
        context = ac;
    }
}
```

then add an entry in application-context.xml

```xml
<bean id="applicationContextProvider"
class="com.java2novice.spring.ApplicationContextProvider"/>
```

or just add to it an annotation

```java
@Component
public class ApplicationContextProvider implements ApplicationContextAware{
    ...
}
```

then we can get the context like this:

```java
TestBean tb = ApplicationContextProvider.getApplicationContext().getBean("testBean", TestBean.class);
```

After that, we can get Beans from ApplicationContext, and use them:

```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);
// use configured instance
List<String> userList = service.getUsernameList();
```

**It's the end!!**


[1]: https://docs.spring.io/spring-framework/docs/current/reference/html/core.html  
[2]: https://stackoverflow.com/questions/6550700/inversion-of-control-vs-dependency-injection
[3]: https://www.tutorialsteacher.com/ioc/dependency-injection
[4]: https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-introduction
[5]: https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-annotation-config
[5.1]: https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-autowire
[6]: https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-java
[6.1]: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html
[6.2]: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html
[6.3]: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html
[6.4]: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/DependsOn.html
