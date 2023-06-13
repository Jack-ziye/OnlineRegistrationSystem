package com.code.utils;

import com.code.entity.pf.Talent;

public class TalentThreadLocal {

    private TalentThreadLocal() {
    }


    private static final ThreadLocal<Talent> LOCAL = new ThreadLocal<>();

    public static void put(Talent talent) {
        LOCAL.set(talent);
    }

    public static Talent get() {
        return LOCAL.get();
    }

    public static void removeTalent() {
        LOCAL.remove();
    }

}
